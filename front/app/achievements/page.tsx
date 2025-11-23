"use client";

import HeaderComponent from "@/components/header/header";
import DockSetup from "@/components/dock/DockSetup";
import styles from "../page.module.scss";
import { useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import CardSetup from "@/components/achievements/CardSetup";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {}

function Page(props: Props) {
  const {} = props;

  const {
    data: achievements,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userAchievements"],
    queryFn: async () => {
      const { data } = await api.get(`/user-achievements/my`);
      return data;
    },
  });

  useEffect(() => {
    try {
      api.post("/task-completion", { taskId: 8 }).then((res) => {
        if (res.data === "DONE ALREADY") {
          return;
        } else {
          console.log(res.data);
          toast.success("Достижение: Вы увидели зал славы", {
            id: "1233",
            style: {
              backgroundColor: "rgba(180, 0, 0, 0.55)",
              outline: "2px solid #941d3a",
              color: "white",
              backdropFilter: "blur(2px)",
            },
          });
        }
      });

      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error) {}
  }, []);

  return (
    <>
      <HeaderComponent />
      <main className={styles.main}>
        {isLoading ? (
          <p>Секунду...</p>
        ) : achievements.achievements.length > 0 ? (
          <CardSetup
            data={achievements.achievements}
            tasksCount={achievements.tasksCount}
          />
        ) : (
          <a href={"/auth"} className={styles.empty}>
            Войдите в аккаунт
          </a>
        )}
        <Toaster position="bottom-right" />
      </main>
      <DockSetup />
    </>
  );
}

export default Page;
