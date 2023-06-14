import { useContext } from "react";
import { CurrentMonthDemandeAbandonneeContext } from "../../../context/CurrentMonth/CurrentMonthDemandeAbandonnee.context";

export const useCurrentMonthDemandeAbandonnee = () => {
  return useContext(CurrentMonthDemandeAbandonneeContext);
};
