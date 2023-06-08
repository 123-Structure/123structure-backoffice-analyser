import { useContext } from "react";
import { DevisCommandeContext } from "../../../context/DevisCommande.context";

export const useDevisCommande = () => {
  return useContext(DevisCommandeContext);
};
