import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const dbUri: string =
      process.env.MONGO_URI || "mongodb://localhost:27017/Glide";
    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
