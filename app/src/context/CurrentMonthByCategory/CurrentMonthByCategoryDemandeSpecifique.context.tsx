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
      value: -1,
      percent: 0,
    },
  },
];

export const CurrentMonthByCategoryDemandeSpecifiqueContext =
  createContext<IGetCurrentMonthResponse[]>(defaultValue);

export const CurrentMonthByCategoryDemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IGetCurrentMonthResponse[]>>
>(() => {});

const CurrentMonthByCategoryDemandeSpecifiqueContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] =
    useState<IGetCurrentMonthResponse[]>(defaultValue);

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch(
        `http://localhost:3000/api/demandeSpecifique/currentMonthByCategory/${
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
      handleDemandeSpecifique();
    };
  }, []);

  return (
    <CurrentMonthByCategoryDemandeSpecifiqueContext.Provider value={notionData}>
      <CurrentMonthByCategoryDemandeSpecifiqueUpdateContext.Provider
        value={setNotionData}
      >
        {props.children}
      </CurrentMonthByCategoryDemandeSpecifiqueUpdateContext.Provider>
    </CurrentMonthByCategoryDemandeSpecifiqueContext.Provider>
  );
};

export default CurrentMonthByCategoryDemandeSpecifiqueContextProvider;
