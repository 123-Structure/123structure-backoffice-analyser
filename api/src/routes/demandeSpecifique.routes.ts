import express from "express";
import {
  getAllPages,
  getCurrentMonth,
  getCurrentMonthByCategory,
} from "../controllers/notionAPI.controllers";

const demandeSpecifiqueRouter = express.Router();

// GET all demandeSpecifique
demandeSpecifiqueRouter.get("/", getAllPages);
// GET all demandeSpecifique by month
demandeSpecifiqueRouter.get(
  "/currentMonth/:month/:year",
  getCurrentMonth
);
// GET all demandeAbandonnee by month and category
demandeSpecifiqueRouter.get(
  "/currentMonthByCategory/:month/:year",
  getCurrentMonthByCategory
);

export default demandeSpecifiqueRouter;
