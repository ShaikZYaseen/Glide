import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import {
  getCoordinates,
  getDistanceTime,
  getSuggestions,
} from "../controllers/maps.controllers";

const mapRouter = express.Router();
mapRouter.route("/coordinates").get(authMiddleware, getCoordinates);
mapRouter.route("/distance").get(authMiddleware, getDistanceTime);
mapRouter.route("/suggestions").get(authMiddleware, getSuggestions);

export default mapRouter;
