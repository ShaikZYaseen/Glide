import express from "express";
import { createRide, getFare } from "../controllers/ride.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const rideRouter = express.Router();

rideRouter.route("/create-ride").post(authMiddleware, createRide);
rideRouter.route("/get-fare").post(authMiddleware, getFare);

export default rideRouter;
