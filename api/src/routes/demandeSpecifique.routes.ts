import express from "express";
import {
  getAllPages,
  getAllPagesCurrentMonth,
} from "../controllers/notionAPI.controllers";

const demandeSpecifiqueRouter = express.Router();

// GET all demandeSpecifique
demandeSpecifiqueRouter.get("/", getAllPages);
// GET all demandeSpecifique by month
demandeSpecifiqueRouter.get("/currentMonth/:monthAgo", getAllPagesCurrentMonth);

export default demandeSpecifiqueRouter;
