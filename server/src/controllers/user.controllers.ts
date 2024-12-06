import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
import { uploadImage } from "../utils/cloudinary";
import { loginSchema, signupSchema } from "../zod/authZod";

// Login Controller
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both email and password.",
    });
  }

  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
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

// Signup Controller
const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log(req.body);
  const validatedData = signupSchema.parse(req.body);
  const { username, email, password, address, phone } = validatedData;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide username, email, and password.",
    });
  }

  try {
    const userExists = await User.findOne({ email }).exec();
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    //@ts-ignore
    const image = await uploadImage(req.file.path);
    const newUser = new User({
      username,
      email,
      password,
      image,
      address,
      phone,
    });

    const user = await newUser.save();

    const token = newUser.getJWTToken();

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    //@ts-ignore
    const id = req.user;
    const data = await User.findById(id);
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

// Check if logged in
const isLoggedin = async (req: Request, res: Response): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id).exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token.",
      });
    }

    return res.status(200).json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error in isLoggedin middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token or expired session.",
    });
  }
};

// Logout Controller
const logoutController = async (req: Request, res: Response): Promise<any> => {
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
  loginController,
  signupController,
  isLoggedin,
  logoutController,
  getProfileController,
};
