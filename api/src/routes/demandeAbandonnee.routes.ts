import express from "express";
import {
  getAllPages,
  getAllPagesPastMonth,
} from "../controllers/notionAPI.controllers";

const demandeAbandonneeRouter = express.Router();

// GET all demandeAbandonnee
demandeAbandonneeRouter.get("/", getAllPages);
// GET all demandeAbandonnee by month
demandeAbandonneeRouter.get("/pastMonth/:monthAgo", getAllPagesPastMonth);

export default demandeAbandonneeRouter;
