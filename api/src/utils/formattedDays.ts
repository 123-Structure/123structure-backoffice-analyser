import { dateOption } from "../data/constants/dateOption";

export const formattedDays = (month: number, year: number) => {
  // Create a new date object with the desired year and month
  const firstDayOfDesiredMonth = new Date(year, month - 1, 1);
  const lastDayOfDesiredMonth = new Date(year, month, 0);

  // Format the dates as strings
  const formattedFirstDay = firstDayOfDesiredMonth.toLocaleDateString(
    "fr-FR",
    dateOption
  );
  const formattedLastDay = lastDayOfDesiredMonth.toLocaleDateString(
    "fr-FR",
    dateOption
  );

  return { firstDay: formattedFirstDay, lastDay: formattedLastDay };
};
