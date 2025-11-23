import { Router } from "express";
import prisma from "../repo/prismaClient";

const router = Router();

// CREATE achievement
router.post("/", async (req, res) => {
  const { title, icon } = req.body;

  const achievement = await prisma.achievement.create({
    data: { title, icon },
  });
  res.json(achievement);
});

// GET all achievements
router.get("/", async (_, res) => {
  const achievements = await prisma.achievement.findMany({
    include: { users: true, task: true },
  });
  res.json(achievements);
});

// GET one achievement
router.get("/:id", async (req, res) => {
  const achievement = await prisma.achievement.findUnique({
    where: { id: Number(req.params.id) },
    include: { users: true, task: true },
  });
  res.json(achievement);
});

// UPDATE achievement
router.put("/:id", async (req, res) => {
  const { title, icon } = req.body;

  const achievement = await prisma.achievement.update({
    where: { id: Number(req.params.id) },
    data: { title, icon },
  });
  res.json(achievement);
});

// DELETE achievement
router.delete("/:id", async (req, res) => {
  await prisma.achievement.delete({ where: { id: Number(req.params.id) } });
  res.json({ ok: true });
});

export default router;
