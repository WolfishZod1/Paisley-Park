import { Router } from "express";
import prisma from "../repo/prismaClient";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { IUserRequest } from "../interfaces/User";

const router = Router();

// CREATE task
router.post("/", async (req, res) => {
  const { title, description, achievementId } = req.body;

  const task = await prisma.task.create({
    data: { title, description, achievementId },
  });
  res.json(task);
});

// GET all tasks
router.get("/", async (_, res) => {
  const tasks = await prisma.task.findMany({
    include: { achievement: true },
  });
  res.json(tasks);
});

// GET one task
// router.get("/:id", async (req, res) => {
//   const task = await prisma.task.findUnique({
//     where: { id: Number(req.params.id) },
//     include: { achievement: true },
//   });
//   res.json(task);
// });

// UPDATE task
router.put("/:id", async (req, res) => {
  const { title, description, achievementId } = req.body;

  const task = await prisma.task.update({
    where: { id: Number(req.params.id) },
    data: { title, description, achievementId },
  });
  res.json(task);
});

// DELETE task
router.delete("/:id", async (req, res) => {
  await prisma.task.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
});

router.get("/uncompleted", isAuthenticated, async (req: IUserRequest, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "Incorrect user id" });
    }

    const tasks = await prisma.task.findMany({
      where: {
        completions: {
          none: {
            userId,
            completed: true,
          },
        },
      },
      include: {
        achievement: true,
      },
    });

    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
