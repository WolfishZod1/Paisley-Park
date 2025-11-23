"use client";

import About from "@/components/about/about";

import DockSetup from "@/components/dock/DockSetup";
import HeaderComponent from "@/components/header/header";

import { Toaster } from "react-hot-toast";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <>
      <HeaderComponent />
      <About />
      <DockSetup />
      <Toaster position="bottom-right" />
    </>
  );
}

export default Page;
