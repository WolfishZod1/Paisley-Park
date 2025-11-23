"use client";

import DockSetup from "@/components/dock/DockSetup";
import "./globals.css";
import Header from "@/components/header/header";
import MapComponent from "@/components/map/MapComponent";
import styles from "./page.module.scss";
import { Toaster } from "react-hot-toast";
import WelcomeMessage from "@/components/WelcomeMessage/WelcomeMessage";
import { useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import useAuth from "@/hook/useAuth";

// const toGenitive = (weekday: string) => {
//   const map: Record<string, string> = {
//     понедельник: "Замечательного понедельника ",
//     вторник: "Прекрасного вторника ",
//     среда: "Продуктивной среды ",
//     четверг: "Чилового четверга ",
//     пятница: "Веселой пятницы ",
//     суббота: "Интересной субботы ",
//     воскресенье: "Хорошего воскресенья ",
//   };

//   return map[weekday.toLowerCase()] || weekday;
// };

export default function Home() {
  const { isAuth } = useAuth();

  const {
    data: achievements,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data } = await api.get(`/tasks/uncompleted`);
      return data;
    },
  });

  return (
    <>
      <Header />
      <Toaster position="bottom-right" />

      <main className={styles.main}>
        <WelcomeMessage text={"Задания"} emoji="" />
        <MapComponent
          refetchFunc={refetch}
          data={
            isAuth && !isLoading && achievements
              ? achievements.map((el: any) => {
                  return {
                    label: el.title,
                    type: el.type,
                    desc: el.description,
                    id: el.id,
                    url: el.url,
                  };
                })
              : [
                  {
                    label: "Войди в аккаунт",
                    type: "SITE",
                    desc: "Скорее присоединяйся, мы ждем тебя!",
                    url: "/auth",
                  },
                ]
          }
        />
      </main>

      <DockSetup />
    </>
  );
}
