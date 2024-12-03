import {
  loginController,
  signupController,
  logoutController,
  getProfileController,
} from "../controllers/user.controllers";

import express from "express";
import upload from "../utils/multer";
import { authMiddleware } from "../middlewares/auth.middlewares";

const userRouter = express.Router();

userRouter.route("/signup").post(upload.single("image"), signupController);
userRouter.route("/login").post(loginController);
userRouter.route("/logout").post(authMiddleware, logoutController);
userRouter.route("/profile").get(authMiddleware, getProfileController);

export { userRouter };
