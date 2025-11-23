import DockSetup from "@/components/dock/DockSetup";
import Header from "@/components/header/header";
import type { Metadata } from "next";
import styles from "../page.module.scss";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Paisley Park | Профиль",
  description: "Ваш личный профиль",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {children}
        <Toaster position="bottom-right" />
      </main>
      <DockSetup />
    </>
  );
}
