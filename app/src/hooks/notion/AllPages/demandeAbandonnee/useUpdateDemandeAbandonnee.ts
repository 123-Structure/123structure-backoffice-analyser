import { useContext } from "react";
import { DemandeAbandonneeUpdateContext } from "../../../../context/AllPages/DemandeAbandonnee.context";

export const useUpdateDemandeAbandonnee = () => {
  return useContext(DemandeAbandonneeUpdateContext);
};
