import express from "express";
import {
  getAllPages,
  getCurrentMonth,
} from "../controllers/notionAPI.controllers";

const devisCommandeRouter = express.Router();

// GET all devisCommande
devisCommandeRouter.get("/", getAllPages);
// GET all devisCommande by month
devisCommandeRouter.get("/currentMonth/:month/:year", getCurrentMonth);

export default devisCommandeRouter;
