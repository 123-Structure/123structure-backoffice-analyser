import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IGetCurrentMonthResponse } from "../../data/interfaces/IGetCurrentMonth";

interface INotionContextProps {
  children: React.ReactNode;
}

const defaultValue: IGetCurrentMonthResponse[] = [
  {
    type: "",
    length: -1,
    difference: {
      period: {
        start: "00/00/0000",
        end: "00/00/0000",
      },
      value: 0,
      percent: 0,
    },
  },
];

export const CurrentMonthByCategoryDevisCommandeContext =
  createContext<IGetCurrentMonthResponse[]>(defaultValue);
export const CurrentMonthByCategoryDevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<IGetCurrentMonthResponse[]>>
>(() => {});

const CurrentMonthByCategoryDevisCommandeContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetCurrentMonthResponse[]>(defaultValue);

  useEffect(() => {
    const handleDevisCommande = () => {
      fetch(
        `http://localhost:3000/api/devisCommande/currentMonthByCategory/${
          new Date().getMonth() + 1
        }/${new Date().getFullYear()}`
      )
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
    <CurrentMonthByCategoryDevisCommandeContext.Provider value={notionData}>
      <CurrentMonthByCategoryDevisCommandeUpdateContext.Provider
        value={setNotionData}
      >
        {props.children}
      </CurrentMonthByCategoryDevisCommandeUpdateContext.Provider>
    </CurrentMonthByCategoryDevisCommandeContext.Provider>
  );
};

export default CurrentMonthByCategoryDevisCommandeContextProvider;
