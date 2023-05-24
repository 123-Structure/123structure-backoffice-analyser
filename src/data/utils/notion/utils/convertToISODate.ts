export const convertToISODate = (
  dateString: string,
  splitter: string,
  separator: string
) => {
  // Split the date string into day, month, and year components
  const [day, month, year] = dateString.split(splitter);
  return [year, month, day].join(separator);
};
