import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ------------------ ROLES ------------------
  const rolesCount = await prisma.role.count();
  if (rolesCount === 0) {
    await prisma.role.createMany({
      data: [{ name: "ADMIN" }, { name: "USER" }],
    });
    console.log("Roles seeded!");
  }

  // ------------------ USER GROUP ANALYSIS ------------------
  const userGrAnCount = await prisma.userGroupAnalysis.count();
  if (userGrAnCount === 0) {
    await prisma.userGroupAnalysis.createMany({
      data: [
        {
          name: "ACTIVE",
          description: "Тебе хочется везде успеть",
          nameForUser: "Активист",
        },
        {
          name: "SCIENCE",
          description: "Ты хочешь знать все!",
          nameForUser: "Ученый",
        },
      ],
    });
    console.log("userGrAn seeded!");
  }

  // ------------------ ACHIEVEMENTS ------------------
  const achievementsCount = await prisma.achievement.count();
  if (achievementsCount === 0) {
    await prisma.achievement.createMany({
      data: [
        { title: "Первый шаг", icon: "backpack.png" },
        { title: "Красота!", icon: "start.png" },
        { title: "Сила воли", icon: "will.png" },
        { title: "Студак", icon: "studak.png" },
        { title: "Самолет?", icon: "plane.png" },
        { title: "Хто я?", icon: "cat.png" },
        { title: "Художник", icon: "krita.png" },
        { title: "Нет предела совершенству!", icon: "trophy.png" },
        { title: "Привет всем!", icon: "tg.png" },
        { title: "D4C", icon: "d4c.png" },
      ],
    });
    console.log("Achievements seeded!");
  }

  // ------------------ TASKS ------------------
  const tasksCount = await prisma.task.count();
  if (tasksCount === 0) {
    const achievements = await prisma.achievement.findMany();

    await prisma.task.createMany({
      data: [
        {
          title: "1 сентября",
          description: "Приди на 1 сентября",
          achievementId: achievements[0].id,
          type: "SITE",
        },
        {
          title: "Сменить аватар",
          description: "Добавьте свое фото в профиле",
          achievementId: achievements[1].id,
          type: "SITE",
          url: "/profile",
        },
        {
          title: "Выполнить первое задание наставника",
          description: "Начни свой путь!",
          achievementId: achievements[2].id,
        },
        {
          title: "Получить студак",
          description: "Получи студак",
          achievementId: achievements[3].id,
        },
        {
          title: "Найти самолет",
          description: "Найди самолет",
          achievementId: achievements[4].id,
        },
        {
          title: "Смени роль",
          description: "Зайди в профиль и измени роль",
          achievementId: achievements[5].id,
          type: "SITE",
          url: "/profile",
        },
        {
          title: "Штрих души",
          description: "Проверь менталку",
          achievementId: achievements[6].id,
          type: "SITE",
          url: "/health",
        },
        {
          title: "Посмотри достижения",
          description: "Зайди в свои достижения",
          achievementId: achievements[7].id,
          type: "SITE",
          url: "/achievements",
        },
        {
          title: "Начни общаться с группой",
          description: "Познакомься с группой",
          achievementId: achievements[8].id,
          type: "MENTOR",
        },
        {
          title: "D4C",
          description: "Узнай о нас",
          achievementId: achievements[9].id,
          type: "SITE",
          url: "/about",
        },
      ],
    });
    console.log("Tasks seeded!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
