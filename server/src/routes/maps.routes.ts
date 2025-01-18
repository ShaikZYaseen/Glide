import express from "express";
import { authMiddleware } from "../middlewares/auth.middlewares";
import {
  getCoordinates,
  getDistanceTime,
  getSuggestions,
  getCaptainInRadius,
} from "../controllers/maps.controllers";

const mapRouter = express.Router();
mapRouter.route("/coordinates").get(authMiddleware, getCoordinates);
mapRouter.route("/distance").get(authMiddleware, getDistanceTime);
mapRouter.route("/suggestions").get(authMiddleware, getSuggestions);
mapRouter.route("/getCaptainsAround").get(authMiddleware, getCaptainInRadius);

export default mapRouter;
