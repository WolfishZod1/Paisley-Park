"use client";
import Progress from "@ramonak/react-progress-bar";
import styles from "./styles.module.scss";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import { useEffect } from "react";
import { makeConfetti } from "../confetti/Confetti";

export default function ProgressBar({ completed }: { completed: number }) {
  useEffect(() => {
    makeConfetti();
  }, []);

  return (
    <div className="containerProgressbar">
      <WelcomeMessage text="Зал славы" emoji="" />
      <Progress
        className={styles.progress_bar}
        completed={completed}
        bgColor="#941d3a"
        baseBgColor="#c1c1c1"
        height="100%"
        animateOnRender={true}
      />
    </div>
  );
}
