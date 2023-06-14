import { useContext } from "react";
import DemandeAbandonneeContext from "../../../../context/AllPages/DemandeAbandonnee.context";

export const useDemandeAbandonnee = () => {
  return useContext(DemandeAbandonneeContext);
};
