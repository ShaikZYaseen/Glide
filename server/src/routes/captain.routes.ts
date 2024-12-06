import {
  captainLoginController,
  captainLogoutController,
  captainSignupController,
  getCaptainProfile,
} from "../controllers/captain.controllers";
import express from "express";
import { captainAuthMiddleware } from "../middlewares/auth.middlewares";
import upload from "../utils/multer";

const captainRouter = express.Router();

captainRouter
  .route("/signup")
  .post(upload.single("image"), captainSignupController);
captainRouter.route("/login").post(captainLoginController);
captainRouter.route("/profile").get(captainAuthMiddleware, getCaptainProfile);
captainRouter
  .route("/logout")
  .post(captainAuthMiddleware, captainLogoutController);

export { captainRouter };
