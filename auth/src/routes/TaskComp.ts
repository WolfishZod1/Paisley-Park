import { Router } from "express";
import prisma from "../repo/prismaClient";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { IUserRequest } from "../interfaces/User";

const router = Router();

// MARK task completed
router.post("/", isAuthenticated, async (req: IUserRequest, res) => {
  const { taskId } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).send("Нет id пользователя");
  }

  const checkIsCompletion = await prisma.taskCompletion.findUnique({
    where: {
      userId_taskId: { userId, taskId },
    },
  });

  if (checkIsCompletion !== null) {
    return res.send("DONE ALREADY");
  }

  const completion = await prisma.taskCompletion.upsert({
    where: {
      userId_taskId: { userId, taskId },
    },
    update: { completed: true },
    create: { userId, taskId, completed: true },
  });

  // give user the linked achievement
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (task?.achievementId) {
    await prisma.userAchievement.upsert({
      where: {
        userId_achievementId: {
          userId,
          achievementId: task.achievementId,
        },
      },
      update: {},
      create: {
        userId,
        achievementId: task.achievementId,
      },
    });
  }

  res.json({ completion, achievementGranted: task?.achievementId || null });
});

// GET all completions
router.get("/", async (_, res) => {
  const list = await prisma.taskCompletion.findMany({
    include: { user: true, task: true },
  });
  res.json(list);
});

// DELETE completion
router.delete("/:id", async (req, res) => {
  await prisma.taskCompletion.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ ok: true });
});

export default router;
