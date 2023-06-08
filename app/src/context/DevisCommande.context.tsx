import { createContext, Dispatch, SetStateAction, useState } from "react";

export const DevisCommandeContext = createContext<[]>([]);
export const DevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<[]>>
>(() => []);

interface INotionContextProps {
  children: React.ReactNode;
}

const DevisCommandeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<[]>([]);

  return (
    <DevisCommandeContext.Provider value={notionData}>
      <DevisCommandeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DevisCommandeUpdateContext.Provider>
    </DevisCommandeContext.Provider>
  );
};

export default DevisCommandeContextProvider;
