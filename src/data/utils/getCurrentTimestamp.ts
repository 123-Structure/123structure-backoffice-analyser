export const getCurrentTimestamp = (): string => {
  const now = new Date();
  const options = { timeZone: "Europe/Paris" }; // Set the desired time zone
  return now.toLocaleString("fr-FR", options);
};
