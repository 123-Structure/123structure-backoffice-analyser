import { useContext } from "react";
import { CurrentMonthDemandeAbandonneeUpdateContext } from "../../../context/CurrentMonth/CurrentMonthDemandeAbandonnee.context";

export const useUpdateCurrentMonthPagesDemandeAbandonnee = () => {
  return useContext(CurrentMonthDemandeAbandonneeUpdateContext);
};
