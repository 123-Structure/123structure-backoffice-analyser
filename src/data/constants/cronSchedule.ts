// Define the cron schedule
export const cronScheduleEveryMinute = "* * * * *"; // Every minute
export const cronScheduleEveryFifteenMinutes = "*/15 * * * 1-5"; // Every 15 minutes, Monday to Friday
export const cronScheduleEveryThirtyMinutes = "*/30 * * * 1-5"; // Every 30 minutes, Monday to Friday
export const cronScheduleOnWorkDay = "0 7 * * 1-5"; // At 7:00, Monday to Friday
