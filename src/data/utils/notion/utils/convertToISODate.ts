export const convertToISODate = (dateString: string) => {
  // Split the date string into day, month, and year components
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};