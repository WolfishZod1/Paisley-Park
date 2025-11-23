"use client";

import ProgressBar from "../progressBar/progressBar";
import styles from "./styles.module.scss";
import Card from "@/components/achievements/Card";

interface Props {
  data: { title: string; icon: string; task: { description: string } }[];
  tasksCount: number;
}

function CardSetup(props: Props) {
  const { data, tasksCount } = props;
  console.log(data.length / tasksCount);

  return (
    <>
      <ProgressBar completed={(data.length / tasksCount) * 100} />
      <ul className={styles.card_list}>
        {data.map((el) => {
          console.log(el);
          return (
            <Card
              key={el.icon}
              name={el.title}
              title={el.task.description}
              handle="javicodes"
              showUserInfo={false}
              enableTilt={false}
              enableMobileTilt={false}
              avatarUrl={`https://ngtu.chermi6267.netcraze.pro/serverapi/user-achievements/img/${el.icon}`}
            />
          );
        })}
      </ul>
    </>
  );
}

export default CardSetup;
