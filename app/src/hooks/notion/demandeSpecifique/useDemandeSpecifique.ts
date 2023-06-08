import { useContext } from "react";
import { DemandeSpecifiqueContext } from "../../../context/DemandeSpecifique.context";

export const useDemandeSpecifique = () => {
  return useContext(DemandeSpecifiqueContext);
};
