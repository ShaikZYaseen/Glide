import mongoose, { Document, Schema, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define an interface for the Captain document
export interface ICaptain extends Document {
  username: string;
  email: string;
  password: string;
  socketId?: string;
  status: "active" | "inactive";
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: "car" | "motorcycle" | "auto";
  };
  location?: {
    lat: number;
    long: number;
  };
  getJWTToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// Define the schema
const captainSchema = new Schema<ICaptain>({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

// Add methods to the schema
captainSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

captainSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Pre-save middleware to hash the password
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Define the model
export const CaptainModel: Model<ICaptain> = mongoose.model<ICaptain>(
  "Captain",
  captainSchema
);