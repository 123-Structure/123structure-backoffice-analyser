import { dateOption } from "../data/constants/dateOption";

export const formattedDays = (monthsAgo: number) => {
  // Get the current date
  const currentDate = new Date();

  // Subtract the specified number of months from the current date
  currentDate.setMonth(currentDate.getMonth() - monthsAgo);

  // Set the date to the first day of the current month
  currentDate.setDate(1);

  // Subtract one day to get the last day of the previous month
  const lastDayOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  // Subtract one more month to get the first day of the previous month
  const firstDayOfLastMonth = new Date(
    lastDayOfLastMonth.getFullYear(),
    lastDayOfLastMonth.getMonth(),
    1
  );

  // Format the dates as strings
  const formattedFirstDay = firstDayOfLastMonth.toLocaleDateString(
    "fr-FR",
    dateOption
  );
  const formattedLastDay = lastDayOfLastMonth.toLocaleDateString(
    "fr-FR",
    dateOption
  );

  return { firstDay: formattedFirstDay, lastDay: formattedLastDay };
};
