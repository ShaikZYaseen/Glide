import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./DB/db";
import path from "path";
import http from "http"; // Import http for creating the server
import { initializeSocket } from "./Socket"; // Import socket initialization
dotenv.config();

import { userRouter } from "./routes/user.routes";
import { captainRouter } from "./routes/captain.routes";
import mapRouter from "./routes/maps.routes";
import rideRouter from "./routes/ride.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define API routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/map", mapRouter);
app.use("/api/v1/captain", captainRouter);
app.use("/api/v1/ride", rideRouter);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "./src/uploads")));

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  connectDb(); // Connect to the database
  console.log(`Server running on port ${PORT}`);
});
