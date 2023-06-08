import { useContext } from "react";
import { DevisCommandeUpdateContext } from "../../../context/DevisCommande.context";

export const useUpdateDevisCommande = () => {
  return useContext(DevisCommandeUpdateContext);
};
