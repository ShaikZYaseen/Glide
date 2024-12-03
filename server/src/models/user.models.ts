import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the User interface extending mongoose Document
interface IUser extends Document {
  username: string;
  phone?: number;
  email: string;
  password: string;
  image?: string;
  address?: string;
  socketId?: string;
  comparePassword(password: string): Promise<boolean>;
  getJWTToken(): string;
}

// User schema definition
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
  socketId: {
    type: String,
  },
});

// Password hashing before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare entered password with the hashed password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Creating the User model with the interface and schema
export const User = mongoose.model<IUser>("User", userSchema);
