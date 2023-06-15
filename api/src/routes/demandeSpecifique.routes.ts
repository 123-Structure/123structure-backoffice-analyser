import express from "express";
import {
  getAllPages,
  getCurrentMonth,
} from "../controllers/notionAPI.controllers";

const demandeSpecifiqueRouter = express.Router();

// GET all demandeSpecifique
demandeSpecifiqueRouter.get("/", getAllPages);
// GET all demandeSpecifique by month
demandeSpecifiqueRouter.get(
  "/currentMonth/:month/:year",
  getCurrentMonth
);

export default demandeSpecifiqueRouter;
