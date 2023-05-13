export const getCurrentTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleString("fr-FR");
};
