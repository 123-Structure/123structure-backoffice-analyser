export const addDaysToDate = (dateString: string, days: number) => {
  // Split the input date string into day, month, and year components
  const parts = dateString.split("-");
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);

  // Create a Date object with the extracted values
  const date = new Date(year, month, day);
  // Add the specified number of days to the date
  date.setDate(date.getDate() + days);

  // Convert the modified date back to the desired format
  const modifiedDateString = `${("0" + date.getDate()).slice(-2)}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getFullYear()}`;

  // Return the modified date
  return modifiedDateString;
};
