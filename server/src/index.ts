import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./DB/db";
import path from "path";
dotenv.config();
import { userRouter } from "./routes/user.routes";
import { captainRouter } from "./routes/captain.routes";
import mapRouter from "./routes/maps.routes";
import rideRouter from "./routes/ride.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/map", mapRouter);
app.use("/api/v1/captain", captainRouter);
app.use("/api/v1/ride", rideRouter);

app.use("/uploads", express.static(path.join(__dirname, "./src/uploads")));

app.listen(process.env.PORT || 8080, () => {
  connectDb();
  console.log(`Server running on port ${process.env.PORT || 8080}`);
});
