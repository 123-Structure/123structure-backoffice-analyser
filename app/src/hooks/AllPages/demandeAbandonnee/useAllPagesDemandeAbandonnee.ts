import { useContext } from "react";
import { AllPagesDemandeAbandonneeContext } from "../../../context/AllPages/AllPagesDemandeAbandonnee.context";

export const useAllPagesDemandeAbandonnee = () => {
  return useContext(AllPagesDemandeAbandonneeContext);
};
