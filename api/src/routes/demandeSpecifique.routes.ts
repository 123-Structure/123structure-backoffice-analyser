import express from "express";
import { getDemandeSpecifique } from "../controllers/demandeSpecifique.controllers";

const demandeSpecifiqueRouter = express.Router();

// GET all customers
demandeSpecifiqueRouter.get("/", getDemandeSpecifique);

export default demandeSpecifiqueRouter;
