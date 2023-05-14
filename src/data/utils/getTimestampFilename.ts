export const getCurrentTimestampFilename = (timestamp: string) => {
  const date = timestamp.split(" ")[0];
  const time = timestamp.split(" ")[1];

  const day = date.split("/")[0];
  const month = date.split("/")[1];
  const year = date.split("/")[2].slice(2);

  const hour = time.split(":")[0];
  const minute = time.split(":")[1];
  // const second = time.split(":")[2];

  return `${year}${month}${day}_${hour}${minute}`;
};
