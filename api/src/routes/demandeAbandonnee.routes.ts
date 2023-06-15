import express from "express";
import {
  getAllPages,
  getCurrentMonth,
} from "../controllers/notionAPI.controllers";

const demandeAbandonneeRouter = express.Router();

// GET all demandeAbandonnee
demandeAbandonneeRouter.get("/", getAllPages);
// GET all demandeAbandonnee by month
demandeAbandonneeRouter.get(
  "/currentMonth/:month/:year",
  getCurrentMonth
);

export default demandeAbandonneeRouter;
