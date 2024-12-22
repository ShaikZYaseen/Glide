import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "first name is required"),
  lastName: z.string().min(1, "last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Please enter password"),
});

export const captainSignupSchema = z.object({
  firstName: z.string().min(1, "first name is required"),
  lastName: z.string().min(1, "last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  color: z.string().min(1, "Please enter a valid color"),
  plate: z.string().min(1, "Please enter a valid plate number"),
  capacity: z.string().min(1, "Please enter a valid capacity"),
  vehicleType: z.enum(["car", "motorcycle", "auto"]),
});

export const captainLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Please enter password"),
});
