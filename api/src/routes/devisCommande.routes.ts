import express from "express";
import { getDevisCommande, getPastMonthDevisCommande } from "../controllers/devisCommande.controllers";

const devisCommandeRouter = express.Router();

// GET all devisCommande
devisCommandeRouter.get("/", getDevisCommande);
// GET all devisCommande
devisCommandeRouter.get("/pastMonth", getPastMonthDevisCommande);

export default devisCommandeRouter;
