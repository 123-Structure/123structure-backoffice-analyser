import express from "express";
import {
  getAllPages,
  getCurrentMonth,
  getCurrentMonthByCategory,
} from "../controllers/notionAPI.controllers";

const demandeAbandonneeRouter = express.Router();

// GET all demandeAbandonnee
demandeAbandonneeRouter.get("/", getAllPages);
// GET all demandeAbandonnee by month
demandeAbandonneeRouter.get(
  "/currentMonth/:month/:year",
  getCurrentMonth
);
// GET all demandeAbandonnee by month and category
demandeAbandonneeRouter.get(
  "/currentMonthByCategory/:month/:year",
  getCurrentMonthByCategory
);

export default demandeAbandonneeRouter;
