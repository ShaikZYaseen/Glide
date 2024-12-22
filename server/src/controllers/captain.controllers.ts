import { Request, Response, NextFunction } from "express";
import { CaptainModel } from "../models/captain.models";
import { captainLoginSchema, captainSignupSchema } from "../zod/authZod";
import { uploadImage } from "../utils/cloudinary";

const captainSignupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const validatedData = captainSignupSchema.parse(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
  } = validatedData;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    return res.status(200).json({
      success: false,
      message: "Please fill all the necessary details.",
    });
  }
  try {
    const userExists = await CaptainModel.findOne({ email }).exec();
    if (userExists) {
      return res.status(200).json({
        success: false,
        message: "Email already exists.",
      });
    }

    //@ts-ignore
    const image = await uploadImage(req.file.path);
    const newUser = new CaptainModel({
      firstName,
      lastName,
      email,
      password,
      image,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    const user = await newUser.save();

    const token = newUser.getJWTToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      success: true,
      message: "Captain registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const captainLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const validatedData = captainLoginSchema.parse(req.body);
  const { email, password } = validatedData;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password.",
    });
  }
  try {
    const user = await CaptainModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found with email",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = user.getJWTToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getCaptainProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    //@ts-ignore
    const id = req.user;
    const data = await CaptainModel.findById(id);
    return res.status(200).json({
      success: true,
      user: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const captainLogoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    res.setHeader("Authorization", ""); // Clear Authorization header

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  captainSignupController,
  captainLoginController,
  getCaptainProfile,
  captainLogoutController,
};
