import { captainModel } from "../models/captain.models";
import express from "express";

const captainRouter = express.Router();

captainRouter.route("/signup").post();

export { captainRouter };
