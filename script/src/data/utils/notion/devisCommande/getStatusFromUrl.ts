export const getStatusFromUrl = (input: string): string => {
  // Split the input string into prefix and description
  const [prefix, description] = input.split(" ");

  // Extract the code from the description
  const code = description.split("_")[1].split("-")[0];

  // Extract and capitalize the first word from the description
  const firstWord =
    description.split("_")[1].split("-")[1].charAt(0).toUpperCase() +
    description.split("_")[1].split("-")[1].slice(1);

  // Retrieve the rest of the words from the description
  const remainingWords = description
    .split("_")[1]
    .split("-")
    .slice(2)
    .join(" ");

  // Assemble the transformed string
  const transformedString = `${prefix} ${code} - ${firstWord} ${remainingWords}`;

  return transformedString;
};