import { useContext } from "react";
import { CurrentMonthByCategoryDevisCommandeUpdateContext } from "../../../context/CurrentMonthByCategory/CurrentMonthByCategoryDevisCommande.context";

export const useCurrentMonthByCategoryPagesDevisCommande = () => {
  return useContext(CurrentMonthByCategoryDevisCommandeUpdateContext);
};
