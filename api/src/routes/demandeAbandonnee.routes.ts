import express from "express";
import {
  getAllPages,
  getAllPagesCurrentMonth,
} from "../controllers/notionAPI.controllers";

const demandeAbandonneeRouter = express.Router();

// GET all demandeAbandonnee
demandeAbandonneeRouter.get("/", getAllPages);
// GET all demandeAbandonnee by month
demandeAbandonneeRouter.get("/currentMonth/:monthAgo", getAllPagesCurrentMonth);

export default demandeAbandonneeRouter;
