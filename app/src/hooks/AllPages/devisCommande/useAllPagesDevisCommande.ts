import { useContext } from "react";
import { AllPagesDevisCommandeContext } from "../../../context/AllPages/AllPagesDevisCommande.context";

export const useAllPagesDevisCommande = () => {
  return useContext(AllPagesDevisCommandeContext);
};
