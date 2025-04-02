import dotenv from "dotenv";

dotenv.dotenvConfig();

export const config = {
  PORT: process.env.PORT ?? 8080,
  URL_MONGODB: process.env.URL_MONGODB,
};
