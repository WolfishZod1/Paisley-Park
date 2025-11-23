"use client";

import HeaderComponent from "@/components/header/header";
import DockSetup from "@/components/dock/DockSetup";
import CanvasDrawSetup from "@/components/canvas/CanvasDrawSetup/CanvasDrawSetup";
import styles from "../page.module.scss";
import { Toaster } from "react-hot-toast";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <>
      <HeaderComponent />
      <main className={styles.main}>
        <CanvasDrawSetup />
        <Toaster position="bottom-right" />
      </main>
      <DockSetup />
    </>
  );
}

export default Page;
