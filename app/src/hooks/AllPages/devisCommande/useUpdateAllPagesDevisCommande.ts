import { useContext } from "react";
import { AllPagesDevisCommandeUpdateContext } from "../../../context/AllPages/AllPagesDevisCommande.context";

export const useUpdateAllPagesDevisCommande = () => {
  return useContext(AllPagesDevisCommandeUpdateContext);
};
