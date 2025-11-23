import "dotenv/config";

export const PORT: number = parseInt(process.env.PORT || "5050");
export const CLIENT_URL: string =
  process.env.CLIENT_URL || "http://localhost:3000";
