import express from "express";
import { getDemandeAbandonnee, getPastMonthDemandeAbandonnee } from "../controllers/demandeAbandonnee.controllers";

const demandeAbandonneeRouter = express.Router();

// GET all demandeAbandonnee
demandeAbandonneeRouter.get("/", getDemandeAbandonnee);
// GET all demandeAbandonnee of past month
demandeAbandonneeRouter.get("/pastMonth", getPastMonthDemandeAbandonnee);

export default demandeAbandonneeRouter;
