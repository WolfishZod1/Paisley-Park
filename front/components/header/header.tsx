"use client";

import Logo from "../svg/logo";
import styles from "./style.module.scss";
import { useState, useEffect, useMemo, use } from "react";
import useAuth from "@/hook/useAuth";
import Image from "next/image";
import AuthHandler from "../auth/authHandler";
import Link from "next/link";
import HeaderButton from "../buttons/headerButton";
import BubbleMenu from "../BubbleMenu/BubbleMenu";
import { useRouter } from "next/navigation";

interface Props {}

function Header(props: Props) {
  const [isClient, setIsClient] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const { isAuth, user } = useAuth();

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 200);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const clientCondition = isAuth && isClient;
  const authHandlerMemo = useMemo(() => {
    return <AuthHandler />;
  }, []);

  const items = [
    {
      label: "Т.А.Б.Л.Е.Т.К.А.",
      href: "/pill",
      ariaLabel: "Т.А.Б.Л.Е.Т.К.А.",
      rotation: -8,
      hoverStyles: { bgColor: "#941d3a", textColor: "#ffffff" },
    },
    {
      label: "Достижения",
      href: "/achievements",
      ariaLabel: "Достижения",
      rotation: 8,
      hoverStyles: { bgColor: "#941d3a", textColor: "#ffffff" },
    },
    {
      label: "Карта",
      href: "/",
      ariaLabel: "Карта",
      rotation: 8,
      hoverStyles: { bgColor: "#941d3a", textColor: "#ffffff" },
    },
    {
      label: "Штрих души",
      href: "/health",
      ariaLabel: "Штрих души",
      rotation: 8,
      hoverStyles: { bgColor: "#941d3a", textColor: "#ffffff" },
    },
    {
      label: "О нас",
      href: "/about",
      ariaLabel: "О нас",
      rotation: -8,
      hoverStyles: { bgColor: "#941d3a", textColor: "#ffffff" },
    },
    {
      label: "Профиль",
      href: clientCondition ? "/profile" : "/auth",
      ariaLabel: "Профиль",
      rotation: -8,
      hoverStyles: { bgColor: "#941d3a", textColor: "#ffffff" },
    },
  ];

  return (
    <>
      {authHandlerMemo}
      <header
        className={`${styles.header} ${isVisible ? "" : styles.header_hidden}`}
        role="header"
      >
        <nav className={styles.header__nav}>
          <Link href="/" aria-label="Перейти на главную страницу">
            <div className={styles.header__logo_container}>
              <Logo className={styles.logo_container__svg} />
              <h1 className={styles.logo_container__text}>Paisley Park</h1>
            </div>
          </Link>
        </nav>

        <nav className={styles.header__test}>
          <HeaderButton
            onClick={() => {
              router.push(clientCondition ? "/profile" : "/auth");
            }}
            hidden={true}
            text={"Профиль"}
            needAnimate={true}
          >
            <div className={styles.buttons_container__user}>
              <Image
                loader={() => {
                  return clientCondition
                    ? user.avatar === "" || user.avatar === null
                      ? "/user.png"
                      : user.avatar
                    : "/user.png";
                }}
                src={
                  clientCondition
                    ? user.avatar === "" || user.avatar === null
                      ? "/user.png"
                      : user.avatar
                    : "/user.png"
                }
                alt={
                  clientCondition
                    ? `Аватар пользователя ${user.name}`
                    : "Аватар пользователя"
                }
                fill
                sizes="width: 100%; height: 100%"
                className={`${styles.user__img} ${
                  clientCondition ? styles["user__img-auth"] : ""
                }`}
                role="img"
              />
            </div>
          </HeaderButton>
        </nav>

        <BubbleMenu
          logo={<></>}
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#8375a1ff"
          menuContentColor="#111111"
          useFixedPosition={false}
          animationEase="power3.out"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </header>
    </>
  );
}

export default Header;
// <motion.nav
//   variants={{
//     initial: {
//       width: "min-content",
//     },
//     animate: {
//       width: "15vw",
//     },
//   }}
//   initial="initial"
//   animate="animate"
//   className={styles.header__buttons_container}
//   style={{
//     display: "flex",
//     justifyContent: "center",
//     color: "#555353ff",
//   }}
// >
//   Главная
// </motion.nav>;
