import axios from "axios";
import { Request, Response } from "express";
import { CaptainModel } from "../models/captain.models";

const getCoordinates = async (req: Request, res: Response): Promise<void> => {
  const { address } = req.query;

  if (!address) {
    res.status(400).json({ error: "Address is required" });
    return;
  }

  try {
    // Make a request to the Mapbox Geocoding API
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address as string
      )}.json`,
      {
        params: {
          access_token: process.env.MAPBOX_API_KEY,
        },
      }
    );

    // Extract coordinates from the response
    const { features } = response.data;
    if (features && features.length > 0) {
      const [longitude, latitude] = features[0].geometry.coordinates;
      res.json({ latitude, longitude });
    } else {
      res.status(404).json({ error: "No coordinates found for the address" });
    }
  } catch (error) {
    console.error("Error fetching coordinates:", (error as Error).message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching coordinates" });
  }
};

const getDistanceTime = async (req: Request, res: Response): Promise<any> => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    res.status(400).json({ error: "Both origin and destination are required" });
    return;
  }

  try {
    // Request to Mapbox Directions API
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(
        origin as string
      )};${encodeURIComponent(destination as string)}.json`,
      {
        params: {
          access_token: process.env.MAPBOX_API_KEY,
          alternatives: false, // Only the primary route
          overview: "simplified", // Simplified geometry
          steps: false, // Exclude step-by-step instructions
        },
      }
    );

    const { routes } = response.data;
    if (routes && routes.length > 0) {
      const { distance, duration } = routes[0]; // Distance in meters, duration in seconds
      res.json({ distance, duration });
    } else {
      res
        .status(404)
        .json({ error: "No route found between the given locations" });
    }
  } catch (error) {
    console.error(
      "Error fetching distance and time:",
      (error as Error).message
    );
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const getSuggestions = async (req: Request, res: Response): Promise<any> => {
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // Make a request to the Mapbox Geocoding API
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input as string
      )}.json`,
      {
        params: {
          access_token: process.env.MAPBOX_API_KEY, // Your Mapbox API key
        },
      }
    );

    // Check if suggestions are returned
    const { features } = response.data;
    if (features && features.length > 0) {
      const suggestions = features.map((feature: any) => ({
        place_name: feature.place_name,
        coordinates: feature.geometry.coordinates, // [longitude, latitude]
        id: feature.id,
      }));

      return res.json({ suggestions });
    }

    return res.status(404).json({ error: "No suggestions found" });
  } catch (error) {
    console.error("Error fetching suggestions:", (error as Error).message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching suggestions" });
  }
};

const getCaptainInRadius = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { ltd, lng, radius } = req.body;
    const captains = await CaptainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6371],
        },
      },
    });

    if (!captains) {
      res.status(404).json({ message: "No drivers nearby" });
    }

    res.status(200).json({ data: captains });
    return;
  } catch (error) {
    console.error("Error fetching suggestions:", (error as Error).message);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching suggestions" });
  }
};

export { getCoordinates, getDistanceTime, getSuggestions, getCaptainInRadius };
