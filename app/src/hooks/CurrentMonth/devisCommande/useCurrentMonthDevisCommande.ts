import { useContext } from "react";
import { CurrentMonthDevisCommandeContext } from "../../../context/CurrentMonth/CurrentMonthDevisCommande.context";

export const useCurrentMonthDevisCommande = () => {
  return useContext(CurrentMonthDevisCommandeContext);
};
