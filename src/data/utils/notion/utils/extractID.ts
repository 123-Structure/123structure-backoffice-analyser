export const extractID = (code: string): number => {
  // Match the code pattern using a regular expression
  const match = code.match(/D\d{2}(\d+)/);

  // If a match is found
  if (match) {
    // Extract the number from the matched portion
    const extractedNumber = match[1];

    // Parse the extracted number as an integer
    const number = parseInt(extractedNumber);

    // Return the extracted number
    return number;
  }

  // If the code format doesn't match the expected pattern, throw an error
  throw new Error("Invalid code format");
};
