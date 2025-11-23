import express, { Request, Response } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./router/Auth";
import { userRouter } from "./router/User";
import { PORT, CLIENT_URL } from "./config";
import tasks from "./routes/Tasks";
import achievements from "./routes/Achievements";
import taskCompletion from "./routes/TaskComp";
import userAchievements from "./routes/UserAchievements";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/tasks", tasks);
app.use("/achievements", achievements);
app.use("/task-completion", taskCompletion);
app.use("/user-achievements", userAchievements);

const server = http.createServer(app);

// Simple check for server start
app.get("/", async (req: Request, res: Response) => {
  try {
    const result = "THE SERVER HAS STARTED SUCCESSFULLY";
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
