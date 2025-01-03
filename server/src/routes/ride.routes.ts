import express from "express";
import { createRide } from "../controllers/ride.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const rideRouter = express.Router();

rideRouter.route("/create-ride").post(authMiddleware, createRide);

export default rideRouter;
