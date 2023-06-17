import { useContext } from "react";
import { CurrentMonthByCategoryDemandeAbandonneeContext } from "../../../context/CurrentMonthByCategory/CurrentMonthByCategoryDemandeAbandonnee.context";

export const useCurrentMonthByCategoryDemandeAbandonnee = () => {
  return useContext(CurrentMonthByCategoryDemandeAbandonneeContext);
};
