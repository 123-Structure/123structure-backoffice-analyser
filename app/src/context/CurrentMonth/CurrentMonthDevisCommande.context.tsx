import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IRequestNotionApiResponse } from "../../data/interfaces/IRequestNotionApiResponse";

interface INotionContextProps {
  children: React.ReactNode;
}

const defaultValue: IRequestNotionApiResponse = {
  type: "",
  length: 0,
  difference: {
    period: {
      start: "00/00/0000",
      end: "00/00/0000",
    },
    value: 0,
    percent: 0,
  },
};

export const CurrentMonthDevisCommandeContext =
  createContext<IRequestNotionApiResponse>(defaultValue);
export const CurrentMonthDevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<IRequestNotionApiResponse>>
>(() => {});

const CurrentMonthDevisCommandeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] =
    useState<IRequestNotionApiResponse>(defaultValue);

  useEffect(() => {
    const handleDevisCommande = () => {
      fetch("http://localhost:3000/api/devisCommande/currentMonth/0")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return () => {
      handleDevisCommande();
    };
  }, []);

  return (
    <CurrentMonthDevisCommandeContext.Provider value={notionData}>
      <CurrentMonthDevisCommandeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </CurrentMonthDevisCommandeUpdateContext.Provider>
    </CurrentMonthDevisCommandeContext.Provider>
  );
};

export default CurrentMonthDevisCommandeContextProvider;
