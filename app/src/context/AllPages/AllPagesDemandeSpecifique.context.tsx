import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IGetAllPagesResponse } from "../../data/interfaces/IGetAllPagesResponse";

interface INotionContextProps {
  children: React.ReactNode;
}

const defaultValue: IGetAllPagesResponse = {
  type: "",
  length: -1,
};

export const AllPagesDemandeSpecifiqueContext =
  createContext<IGetAllPagesResponse>(defaultValue);

export const AllPagesDemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPagesResponse>>
>(() => {});

const AllPagesDemandeSpecifiqueContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetAllPagesResponse>(defaultValue);

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch("http://localhost:3000/api/demandeSpecifique")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return () => {
      handleDemandeSpecifique();
    };
  }, []);

  return (
    <AllPagesDemandeSpecifiqueContext.Provider value={notionData}>
      <AllPagesDemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </AllPagesDemandeSpecifiqueUpdateContext.Provider>
    </AllPagesDemandeSpecifiqueContext.Provider>
  );
};

export default AllPagesDemandeSpecifiqueContextProvider;
