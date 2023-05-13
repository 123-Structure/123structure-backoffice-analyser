import dotenv from "dotenv";

interface IAuth {
  email: string;
  password: string;
}

// Load environment variables from .env file
dotenv.config();

// Get email and password from .env file
const EMAIL = process.env.AUTH_EMAIL as string;
const PASSWORD = process.env.AUTH_PASSWORD as string;

export const auth: IAuth = { email: EMAIL, password: PASSWORD };
