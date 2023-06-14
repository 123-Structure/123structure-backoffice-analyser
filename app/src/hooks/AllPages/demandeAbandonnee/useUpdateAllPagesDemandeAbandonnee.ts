import { useContext } from "react";
import { AllPagesDemandeAbandonneeUpdateContext } from "../../../context/AllPages/AllPagesDemandeAbandonnee.context";

export const useUpdateAllPagesDemandeAbandonnee = () => {
  return useContext(AllPagesDemandeAbandonneeUpdateContext);
};
