"use client";

import HeaderComponent from "@/components/header/header";
import Profile from "@/components/profile/profile";
import useAuth from "@/hook/useAuth";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;
  const { isAuth, user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  const clientCondition = isAuth && isClient;
  useEffect(() => {
    setIsClient(true);
  }, []);

  return clientCondition ? (
    <Profile user={user} />
  ) : (
    <a href={"/auth"} className={styles.empty}>
      Войдите в аккаунт
    </a>
  );
}

export default Page;
