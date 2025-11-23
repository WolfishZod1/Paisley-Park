"use client";

import HeaderComponent from "@/components/header/header";
import DockSetup from "@/components/dock/DockSetup";
import CircularGallery from "@/components/pillCarusel/CircularGallery";
import WelcomeMessage from "@/components/WelcomeMessage/WelcomeMessage";
import MainText from "@/components/pillCarusel/MainText";

interface Props {}

function Page(props: Props) {
  const {} = props;

  const items = [
    { image: "/pill/1.png", text: "" },
    { image: "/pill/2.png", text: "" },
    { image: "/pill/3.png", text: "" },
    { image: "/pill/4.png", text: "" },
    { image: "/pill/5.png", text: "" },
    { image: "/pill/6.png", text: "" },
    { image: "/pill/7.png", text: "" },
    { image: "/pill/8.png", text: "" },
  ];

  return (
    <>
      <HeaderComponent />
      <main>
        <MainText
          text="Т.А.Б.Л.Е.Т.К.А."
          subText={
            '"Турбо-Адская База Лайфхаков для Еле-Тянущегося Круга Абитуриентов" — заметки старших курсов для первокурсников'
          }
        />
        <CircularGallery items={items} />
      </main>
      <DockSetup />
    </>
  );
}

export default Page;
