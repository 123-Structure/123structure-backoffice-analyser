import express from "express";
import {
  getAllPages,
  getAllPagesPastMonth,
} from "../controllers/notionAPI.controllers";

const demandeSpecifiqueRouter = express.Router();

// GET all demandeSpecifique
demandeSpecifiqueRouter.get("/", getAllPages);
// GET all demandeSpecifique by month
demandeSpecifiqueRouter.get("/pastMonth/:monthAgo", getAllPagesPastMonth);

export default demandeSpecifiqueRouter;
