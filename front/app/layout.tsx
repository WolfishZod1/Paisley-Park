import type { Metadata } from "next";
import localFont from "next/font/local";
import { Comfortaa, Pacifico, Pixelify_Sans } from "next/font/google";
import styles from "./page.module.scss";
import "./globals.css";
import { Providers } from "./provider";
import DotGrid from "@/components/DotGribBg/DotGrid";

const comfortaa = Comfortaa({
  subsets: ["cyrillic-ext", "cyrillic"],
  weight: "400",
  variable: "--comfortaa_font",
});

const pacifico = Pacifico({
  subsets: ["cyrillic-ext", "cyrillic"],
  weight: "400",
  variable: "--pacifico_font",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["cyrillic"],
  weight: "400",
  variable: "--pixelify_font",
});

export const miratrix = localFont({
  src: [
    {
      path: "../public/fonts/Miratrix-Normal.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--miratrix_font",
});

export const metadata: Metadata = {
  title: "Paisley Park | Главная",
  description: "Paisley Park это сайт для первокурсников НГТУ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${miratrix.variable} ${pacifico.variable} ${pixelifySans.variable}`}
    >
      <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      <body className={`${comfortaa.className} ${styles.body}`}>
        <DotGrid
          dotSize={7}
          gap={40}
          activeColor="#00ffd0ff"
          baseColor="#098200ff"
          proximity={50}
          shockRadius={10}
          shockStrength={5}
          resistance={10}
          returnDuration={1.5}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
