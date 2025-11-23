import fetch from "node-fetch";
import { SYSTEM_PROMPT } from "./config";

export async function sendToOllama(imageBuffer: Buffer, prompt: string) {
  const imageBase64 = imageBuffer.toString("base64");

  const body = {
    model: "gemma3:4b",
    prompt: prompt,
    images: [imageBase64],
    stream: false,
    system: SYSTEM_PROMPT,
  };

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json();
}
