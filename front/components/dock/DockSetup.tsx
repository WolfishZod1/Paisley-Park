"use client";

import { usePathname, useRouter } from "next/navigation";
import Dock from "./Dock";
import Achievements from "./svg/Achievments";
import MentalHealth from "./svg/MentalHealth";
import Pill from "./svg/Pill";
import styles from "./svg/styles.module.scss";
import Info from "./svg/Info";
import Map from "./svg/Map";

const DockSetup = () => {
  const router = useRouter();
  const url = usePathname();

  const items = [
    {
      icon: <Pill className={styles.svg} />,
      label: "Т.А.Б.Л.Е.Т.К.А.",
      onClick: () => router.push("/pill"),
      className:
        url === "/pill"
          ? styles["dock-item-border-active"]
          : styles["dock-item-border"],
    },

    {
      icon: <Achievements className={styles.svg} />,
      label: "Достижения",
      onClick: () => router.push("/achievements"),
      className:
        url === "/achievements"
          ? styles["dock-item-border-active"]
          : styles["dock-item-border"],
    },

    {
      icon: <Map className={styles.svg} />,
      label: "Карта",
      onClick: () => router.push("/"),
      className:
        url === "/"
          ? styles["dock-item-border-active"]
          : styles["dock-item-border"],
    },

    {
      icon: <MentalHealth className={styles.svg} />,
      label: "Штрих Души",
      onClick: () => router.push("/health"),
      className:
        url === "/health"
          ? styles["dock-item-border-active"]
          : styles["dock-item-border"],
    },

    {
      icon: <Info className={styles.svg} />,
      label: "О нас",
      onClick: () => router.push("/about"),
      className:
        url === "/about"
          ? styles["dock-item-border-active"]
          : styles["dock-item-border"],
    },
  ];

  return (
    <Dock
      items={items}
      panelHeight={10}
      baseItemSize={50}
      magnification={100}
    />
  );
};

export default DockSetup;
