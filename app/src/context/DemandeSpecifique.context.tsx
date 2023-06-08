import { createContext, Dispatch, SetStateAction, useState } from "react";

export const DemandeSpecifiqueContext = createContext<[]>([]);
export const DemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<[]>>
>(() => []);

interface INotionContextProps {
  children: React.ReactNode;
}

const DemandeSpecifiqueContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<[]>([]);

  return (
    <DemandeSpecifiqueContext.Provider value={notionData}>
      <DemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DemandeSpecifiqueUpdateContext.Provider>
    </DemandeSpecifiqueContext.Provider>
  );
};

export default DemandeSpecifiqueContextProvider;
