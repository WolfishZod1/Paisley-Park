import "dotenv/config";

export const PORT: number = parseInt(process.env.PORT || "5050");
export const SYSTEM_PROMPT: string =
  process.env.SYSTEM_PROMPT || "Ты психолог, отвечай в 15 слов максимум";
