import { Router } from "express";
import prisma from "../repo/prismaClient";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { IUserRequest } from "../interfaces/User";
import path from "path";

const router = Router();

// GIVE achievement manually
router.post("/", async (req, res) => {
  const { userId, achievementId } = req.body;

  const ua = await prisma.userAchievement.upsert({
    where: {
      userId_achievementId: { userId, achievementId },
    },
    update: {},
    create: { userId, achievementId },
  });

  res.json(ua);
});

// GET all user achievements
router.get("/", async (_, res) => {
  const items = await prisma.userAchievement.findMany({
    include: { user: true, achievement: true },
  });
  res.json(items);
});

router.get("/img/:imgName", (req, res) => {
  const { imgName } = req.params;

  // Строим путь до файла в папке public/img
  const filePath = path.join(process.cwd(), "public", "img", imgName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "Image not found" });
    }
  });
});

// DELETE user achievement
router.delete("/:id", async (req, res) => {
  await prisma.userAchievement.delete({
    where: { id: Number(req.params.id) },
  });
  res.json({ ok: true });
});

// GET completed achievements for a user with task
router.get("/my", isAuthenticated, async (req: IUserRequest, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    // Получаем все userAchievement данного пользователя

    const tasksCount = await prisma.task.count();
    const completedAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      select: {
        achievement: {
          select: {
            id: true,
            title: true,
            icon: true,
            task: true,
          },
        },
      },
    });

    // Превращаем массив в чистый список ачивок
    const result = completedAchievements.map((ua) => ua.achievement);

    res.json({ achievements: result, tasksCount: tasksCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

export default router;
