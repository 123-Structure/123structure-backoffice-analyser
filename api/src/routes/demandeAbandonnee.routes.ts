import express from "express";
import { getDemandeAbandonnee } from "../controllers/demandeAbandonnee.controllers";

const demandeAbandonneeRouter = express.Router();

// GET all customers
demandeAbandonneeRouter.get("/", getDemandeAbandonnee);

export default demandeAbandonneeRouter;
