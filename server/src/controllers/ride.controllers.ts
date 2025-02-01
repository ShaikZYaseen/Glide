import { Request, Response } from "express";
import axios from "axios";
import rideModels from "../models/ride.models";
import crypto from "crypto";
import { CaptainModel } from "../models/captain.models";

const fetchCoordinates = async (address: string): Promise<string> => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json`,
    {
      params: {
        access_token: process.env.MAPBOX_API_KEY,
      },
    }
  );

  const { features } = response.data;
  if (features && features.length > 0) {
    const [longitude, latitude] = features[0].geometry.coordinates;
    return `${longitude},${latitude}`;
  } else {
    throw new Error("No coordinates found for the address");
  }
};

const fetchDistanceAndTime = async (
  origin: string,
  destination: string
): Promise<{ distance: number; duration: number }> => {
  const response = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}.json`,
    {
      params: {
        access_token: process.env.MAPBOX_API_KEY,
      },
    }
  );
  const { routes } = response.data;
  if (routes && routes.length > 0) {
    const { distance, duration } = routes[0];
    return { distance, duration };
  }

  throw new Error("No routes found");
};

const calculateFare = (
  distance: number,
  duration: number,
  rideType: "auto" | "car" | "bike"
): number => {
  const baseFare = { auto: 24, car: 40, bike: 16 };
  const perKmRate = { auto: 8, car: 12, bike: 6.4 };
  const perMinuteRate = { auto: 1.6, car: 2.4, bike: 1.2 };

  return Math.round(
    baseFare[rideType] +
      (distance / 1000) * perKmRate[rideType] +
      (duration / 60) * perMinuteRate[rideType]
  );
};

const calculateAllFare = (
  distance: number,
  duration: number
): { vehicleType: "auto" | "car" | "bike"; fare: number }[] => {
  const baseFare = { auto: 24, car: 40, bike: 16 };
  const perKmRate = { auto: 8, car: 12, bike: 6.4 };
  const perMinuteRate = { auto: 1.6, car: 2.4, bike: 1.2 };

  const rideTypes: ("auto" | "car" | "bike")[] = ["auto", "car", "bike"];

  return rideTypes.map((rideType) => ({
    vehicleType: rideType,
    fare: Math.round(
      baseFare[rideType] +
        (distance / 1000) * perKmRate[rideType] +
        (duration / 60) * perMinuteRate[rideType]
    ),
  }));
};

export const createRide = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const user = req.user;
    const { pickup, destination, vehicleType } = req.query;
    if (
      typeof vehicleType !== "string" ||
      !["auto", "car", "bike"].includes(vehicleType)
    ) {
      res.status(400).json({ message: "Invalid vehicle type" });
      return;
    }
    const ride = await createRidee({
      user,
      pickup: pickup as string,
      destination: destination as string,
      vehicleType: vehicleType as string,
    });
    if (!ride) {
      res.status(400).json({ message: "Failed to create ride" });
      return;
    }
    res.status(201).json({ ride });

    const originCoordinates = await fetchCoordinates(pickup as string);
    console.log(originCoordinates);
    // const destinationCoordinates = await fetchCoordinates(destination as string);

    // const captainsInRadius = await getCaptainsInTheRadius(originCoordinates,destinationCoordinates, 5000);
    return;
  } catch (error) {
    console.error("Error creating ride:", (error as Error).message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the ride" });
    return;
  }
};

interface rideProps {
  user: String;
  pickup: String;
  destination: String;
  vehicleType: string;
}

const createRidee = async ({
  user,
  pickup,
  destination,
  vehicleType,
}: rideProps) => {
  try {
    if (!user || !pickup || !destination || !vehicleType) {
      throw new Error("User, pickup, destination, vehicleType are required");
    }
    const fare = await getMyFare(pickup, destination);
    const fareObject = fare?.find((item) => item.vehicleType === vehicleType);

    if (!fareObject) {
      throw new Error("Failed to calculate fare");
    }
    const otp = await generateOtp(6);
    const ride = rideModels.create({
      user,
      pickup,
      destination,
      otp,
      //@ts-ignore
      fare: fareObject.fare,
    });

    return ride;
  } catch (error) {
    console.error("Error creating ride:", (error as Error).message);
  }
};

export const getFare = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pickup, destination } = req.query;
    if (!pickup || !destination) {
      res.status(400).json({
        message: "Pickup, destination are required",
      });
      return;
    }
    const originCoordinates = await fetchCoordinates(pickup as string);
    const destinationCoordinates = await fetchCoordinates(
      destination as string
    );

    // Get distance and time
    const { distance, duration } = await fetchDistanceAndTime(
      originCoordinates,
      destinationCoordinates
    );

    // Calculate fare
    const fares = calculateAllFare(distance, duration);

    res.status(200).json({ fares });
    return;
  } catch (error) {
    console.error("Error getting fare:", (error as Error).message);
    res.status(500).json({ error: "An error occurred while getting the fare" });
    return;
  }
};

export const generateOtp = async (num: number) => {
  if (num <= 0) {
    throw new Error("OTP length must be a positive number");
  }

  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();

  // Simulate saving OTP to the database or other processing
  // For demonstration, we just resolve it
  return otp;
};

export const getCaptainsInTheRadius = async (
  ltd: number,
  lng: number,
  radius: number
) => {
  const captain = await CaptainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  return captain;
};

const getMyFare = async (pickup: String, destination: String) => {
  try {
    if (!pickup || !destination) {
      throw new Error("Pickup, destination are required");
      return;
    }
    const originCoordinates = await fetchCoordinates(pickup as string);
    const destinationCoordinates = await fetchCoordinates(
      destination as string
    );

    // Get distance and time
    const { distance, duration } = await fetchDistanceAndTime(
      originCoordinates,
      destinationCoordinates
    );

    // Calculate fare
    const fares = calculateAllFare(distance, duration);
    return fares;
  } catch (error) {
    console.error("Error getting fare:", (error as Error).message);
    throw new Error("An error occurred while getting the fare");
    return;
  }
};
