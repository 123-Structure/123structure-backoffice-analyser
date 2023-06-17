import { useContext } from "react";
import { CurrentMonthByCategoryDemandeAbandonneeUpdateContext } from "../../../context/CurrentMonthByCategory/CurrentMonthByCategoryDemandeAbandonnee.context";

export const useUpdateCurrentMonthByCategoryPagesDemandeAbandonnee = () => {
  return useContext(CurrentMonthByCategoryDemandeAbandonneeUpdateContext);
};
