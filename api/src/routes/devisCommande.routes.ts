import express from "express";
import {
  getAllPages,
  getAllPagesPastMonth,
} from "../controllers/notionAPI.controllers";

const devisCommandeRouter = express.Router();

// GET all devisCommande
devisCommandeRouter.get("/", getAllPages);
// GET all devisCommande by month
devisCommandeRouter.get("/pastMonth/:monthAgo", getAllPagesPastMonth);

export default devisCommandeRouter;
