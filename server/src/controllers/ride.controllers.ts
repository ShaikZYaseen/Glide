import { Request, Response } from "express";
import axios from "axios";
import rideModels from "../models/ride.models";

const getDistanceTime = async (
  origin: string,
  destination: string
): Promise<{ distance: number; duration: number }> => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(
        origin
      )};${encodeURIComponent(destination)}.json`,
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
  } catch (error) {
    console.error(
      "Error fetching distance and time:",
      (error as Error).message
    );
    throw error;
  }
};

const calculateFare = async (
  origin: string,
  destination: string,
  rideType: string
): Promise<any> => {
  const response = await getDistanceTime(origin, destination);

  const { distance, duration } = response;

  const baseFare = {
    auto: 30,
    car: 50,
    bike: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    bike: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    bike: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distance / 1000) * perKmRate.auto +
        (duration / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distance / 1000) * perKmRate.car +
        (duration / 60) * perMinuteRate.car
    ),
    bike: Math.round(
      baseFare.bike +
        (distance / 1000) * perKmRate.bike +
        (duration / 60) * perMinuteRate.bike
    ),
  };

  return fare;
};

export const createRide = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { pickup, destination, vehicleType } = req.query;
  //@ts-ignore
  const user = req.user;
  console.log(req.body);
  if (!pickup || !destination || !vehicleType) {
    res.status(400).json({
      error: " pickup, destination and vehicle type are required",
    });
    return;
  }

  if (!["bike", "auto", "car"].includes(vehicleType as string)) {
    res
      .status(400)
      .json({ error: "Valid ride type is required (bike, auto, car)" });
    return;
  }

  try {
    const fare = await calculateFare(
      pickup as string,
      destination as string,
      vehicleType as string
    );

    const ride = await rideModels.create({
      user,
      pickup,
      destination,
      vehicleType,
      fare: fare[vehicleType as string],
    });

    if (!ride) {
      res.status(500).json({ error: "Error creating ride" });
      return;
    }

    res.status(200).json({ ride });
  } catch (error) {
    console.error("Error creating ride:", (error as Error).message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the ride" });
  }
};
