import express from "express";
import {
  getAllPages,
  getAllPagesCurrentMonth,
} from "../controllers/notionAPI.controllers";

const devisCommandeRouter = express.Router();

// GET all devisCommande
devisCommandeRouter.get("/", getAllPages);
// GET all devisCommande by month
devisCommandeRouter.get("/currentMonth/:monthAgo", getAllPagesCurrentMonth);

export default devisCommandeRouter;
