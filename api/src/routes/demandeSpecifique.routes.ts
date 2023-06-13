import express from "express";
import { getDemandeSpecifique, getPastMonthDemandeSpecifique } from "../controllers/demandeSpecifique.controllers";

const demandeSpecifiqueRouter = express.Router();

// GET all demandeSpecifique
demandeSpecifiqueRouter.get("/", getDemandeSpecifique);
// GET all demandeSpecifique of past month
demandeSpecifiqueRouter.get("/pastMonth", getPastMonthDemandeSpecifique);

export default demandeSpecifiqueRouter;
