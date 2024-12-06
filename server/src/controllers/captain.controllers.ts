import { Request, Response, NextFunction } from "express";
import { captainModel } from "../models/captain.models";
import { captainSignupSchema } from "../zod/authZod";

const captainRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const validatedData = captainSignupSchema.parse(req.body);
  const { username, email, password, color, plate, capacity, vehicleType } =
    validatedData;
  if (
    !username ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the necessary details.",
    });
  }
  try {
    const captain = await captainModel.findOne({ email }).exec();
    if (!captain) {
      return res.status(401).json({
        success: false,
        message: "User already present with the registered details",
      });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const token = captain.getJWTToken();

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
