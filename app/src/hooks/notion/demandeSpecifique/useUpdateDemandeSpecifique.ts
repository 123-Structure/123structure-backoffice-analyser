import { useContext } from "react";
import { DemandeSpecifiqueUpdateContext } from "../../../context/DemandeSpecifique.context";

export const useUpdateDemandeSpecifique = () => {
  return useContext(DemandeSpecifiqueUpdateContext);
};
