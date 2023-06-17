import express from "express";
import {
  getAllPages,
  getCurrentMonth,
  getCurrentMonthByCategory,
} from "../controllers/notionAPI.controllers";

const devisCommandeRouter = express.Router();

// GET all devisCommande
devisCommandeRouter.get("/", getAllPages);
// GET all devisCommande by month
devisCommandeRouter.get("/currentMonth/:month/:year", getCurrentMonth);
// GET all demandeAbandonnee by month and category
devisCommandeRouter.get(
  "/currentMonthByCategory/:month/:year",
  getCurrentMonthByCategory
);

export default devisCommandeRouter;
