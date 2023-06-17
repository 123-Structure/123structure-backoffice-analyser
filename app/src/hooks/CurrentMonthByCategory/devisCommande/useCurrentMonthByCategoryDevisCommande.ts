import { useContext } from "react";
import { CurrentMonthByCategoryDevisCommandeContext } from "../../../context/CurrentMonthByCategory/CurrentMonthByCategoryDevisCommande.context";

export const useCurrentMonthByCategoryDevisCommande = () => {
  return useContext(CurrentMonthByCategoryDevisCommandeContext);
};
