import express from "express";
import { getDevisCommande } from "../controllers/devisCommande.controllers";

const devisCommandeRouter = express.Router();

// GET all customers
devisCommandeRouter.get("/", getDevisCommande);

export default devisCommandeRouter;
