import { useContext } from "react";
import { CurrentMonthDevisCommandeUpdateContext } from "../../../context/CurrentMonth/CurrentMonthDevisCommande.context";

export const useCurrentMonthPagesDevisCommande = () => {
  return useContext(CurrentMonthDevisCommandeUpdateContext);
};
