import { useContext } from "react";
import { CurrentMonthByCategoryDemandeSpecifiqueContext } from "../../../context/CurrentMonthByCategory/CurrentMonthByCategoryDemandeSpecifique.context";

export const useCurrentMonthByCategoryDemandeSpecifique = () => {
  return useContext(CurrentMonthByCategoryDemandeSpecifiqueContext);
};
