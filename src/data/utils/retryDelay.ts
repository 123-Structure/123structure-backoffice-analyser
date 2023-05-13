export const retryDelay = (h: number, m: number, s: number) => {
  const hour = h * 60 * 60 * 1000; // Convert hour to millisecond
  const minute = m * 60 * 1000; // Convert minute to millisecond
  const second = s * 1000; // Convert second to millisecond

  return hour + minute + second;
};
