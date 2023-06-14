import { useContext } from "react";
import { CurrentMonthDemandeSpecifiqueUpdateContext } from "../../../context/CurrentMonth/CurrentMonthDemandeSpecifique.context";

export const useUpdateCurrentMonthDemandeSpecifique = () => {
  return useContext(CurrentMonthDemandeSpecifiqueUpdateContext);
};
