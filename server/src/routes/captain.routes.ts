import {
  captainLoginController,
  captainSignupController,
} from "../controllers/captain.controllers";
import express from "express";

const captainRouter = express.Router();

captainRouter.route("/signup").post(captainSignupController);
captainRouter.route("/login").post(captainLoginController);
captainRouter.route("/profile").get();

export { captainRouter };
