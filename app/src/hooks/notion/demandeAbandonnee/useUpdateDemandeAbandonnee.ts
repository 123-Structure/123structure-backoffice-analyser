import { useContext } from "react";
import { DemandeAbandonneeUpdateContext } from "../../../context/DemandeAbandonnee.context";

export const useUpdateDemandeAbandonnee = () => {
  return useContext(DemandeAbandonneeUpdateContext);
};
