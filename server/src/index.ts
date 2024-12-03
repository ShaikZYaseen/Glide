import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./DB/db";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(process.env.PORT || 3000, () => {
  connectDb();
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
