"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MapCanvas from "./MapCanvas";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDebounce } from "@/hook/useDebounce";
import FloorViewer from "./FloorViewer";

const MapContainer = () => {
  const [opened, setOpened] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const selectedRegion = useSelector(
    (state: RootState) => state.hexMap.selectedRegion
  );
  const debouncedSelectedRegion = useDebounce(selectedRegion, 1500);

  const data = [
    {
      title: "Корпус № 1",
      images: Array.from({ length: 6 }, (_, i) => `/campuses/1/${i}.png`),
    },
    {
      title: "Корпус № 2",
      images: Array.from({ length: 6 }, (_, i) => `/campuses/2/${i}.png`),
    },
    {
      title: "Корпус № 3",
      images: Array.from({ length: 2 }, (_, i) => `/campuses/3/${i}.png`),
    },
    {
      title: "Корпус № 4",
      images: Array.from({ length: 7 }, (_, i) => `/campuses/4/${i}.png`),
    },
    {
      title: "Корпус № 5",
      images: Array.from({ length: 3 }, (_, i) => `/campuses/5/${i}.png`),
    },
    {
      title: "Корпус № 6",
      images: Array.from({ length: 6 }, (_, i) => `/campuses/6/${i}.png`),
    },
    {
      title: "Корпус № 7",
      images: Array.from({ length: 1 }, (_, i) => `/campuses/7/${i}.png`),
    },
    {
      title: "Корпус № 8",
      images: Array.from({ length: 2 }, (_, i) => `/campuses/8/${i}.png`),
    },
    {
      title: "Корпус № 9",
      images: Array.from({ length: 3 }, (_, i) => `/campuses/9/${i}.png`),
    },
    {
      title: "Корпус № 10",
      images: Array.from({ length: 5 }, (_, i) => `/campuses/10/${i}.png`),
    },
    {
      title: "Корпус № 11",
      images: Array.from({ length: 12 }, (_, i) => `/campuses/11/${i}.png`),
    },
  ];

  useEffect(() => {
    setOpened(true);
  }, [selectedRegion]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      setMenuOpened(true);
    }
  }, [debouncedSelectedRegion]);

  return (
    <div className={styles.container}>
      <MapCanvas />

      {!menuOpened && (
        <button
          className={styles.openButton}
          onClick={() => setMenuOpened(true)}
        >
          +
        </button>
      )}
      <AnimatePresence mode="wait">
        {opened && (
          <motion.div
            key={selectedRegion}
            className={styles.menu}
            initial={{ bottom: -50, opacity: 0 }}
            animate={{ bottom: 10, opacity: 1 }}
            exit={{ bottom: -50, opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {data[selectedRegion].title}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {menuOpened && (
          <motion.div
            key={`full-menu-${selectedRegion}`}
            className={styles.fullMenu}
            initial={{ opacity: 0, width: "100%", height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", duration: 0.4, ease: "easeOut" }}
          >
            <button
              className={styles.closeButton}
              onClick={() => setMenuOpened(false)}
            >
              ×
            </button>
            <FloorViewer images={data[selectedRegion].images} interval={2000} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapContainer;
