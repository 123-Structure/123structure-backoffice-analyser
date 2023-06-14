import { useContext } from "react";
import { AllPagesDevisCommandeUpdateContext } from "../../../../context/AllPages/DevisCommande.context";

export const useUpdateDevisCommande = () => {
  return useContext(AllPagesDevisCommandeUpdateContext);
};
