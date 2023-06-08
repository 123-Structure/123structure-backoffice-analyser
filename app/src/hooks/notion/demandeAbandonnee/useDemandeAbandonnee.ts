import { useContext } from "react";
import { DemandeAbandonneeContext } from "../../../context/DemandeAbandonnee.context";

export const useDemandeAbandonnee = () => {
  return useContext(DemandeAbandonneeContext);
};
