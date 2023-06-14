import { useContext } from "react";
import { CurrentMonthDemandeSpecifiqueContext } from "../../../context/CurrentMonth/CurrentMonthDemandeSpecifique.context";

export const useCurrentMonthDemandeSpecifique = () => {
  return useContext(CurrentMonthDemandeSpecifiqueContext);
};
