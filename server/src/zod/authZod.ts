import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().email("Invalid email address"),
  address: z.string(),
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
