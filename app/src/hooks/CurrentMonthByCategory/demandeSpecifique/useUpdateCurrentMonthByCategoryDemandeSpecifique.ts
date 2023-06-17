import { useContext } from "react";
import { CurrentMonthByCategoryDemandeSpecifiqueUpdateContext } from "../../../context/CurrentMonthByCategory/CurrentMonthByCategoryDemandeSpecifique.context";

export const useUpdateCurrentMonthByCategoryDemandeSpecifique = () => {
  return useContext(CurrentMonthByCategoryDemandeSpecifiqueUpdateContext);
};
