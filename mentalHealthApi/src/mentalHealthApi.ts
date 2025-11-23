import express from "express";
import { sendToOllama } from "./sendToOllama";
import { uploadMiddleware } from "./multerMiddleware";
import { PORT } from "./config";

const app = express();

app.post("/generate", uploadMiddleware, async (req, res) => {
  try {
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (!files || !files["image"] || files["image"].length === 0) {
      return res.status(400).json({ error: "Требуется image" });
    }

    const file = files["image"][0];
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Требуется prompt" });
    }

    const result = await sendToOllama(file.buffer, prompt);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
