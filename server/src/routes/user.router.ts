import {
  loginController,
  signupController,
  logoutController,
} from "../controllers/user.controllers";

import express from "express";
import upload from "../utils/multer";

const userRouter = express.Router();

userRouter.route("/signup").post(upload.single("image"), signupController);
userRouter.route("/login").post(loginController);
userRouter.route("/logout").post(logoutController);

export { userRouter };
