"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FloorViewer.module.scss";

interface FloorViewerProps {
  images: string[];
  interval?: number;
}

const FloorViewer: React.FC<FloorViewerProps> = ({
  images,
  interval = 3000,
}) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true); // флаг автоперелистывания
  const autoPlayRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    autoPlayRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (autoPlayRef.current !== null) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, images, interval]);

  const goUp = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goDown = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        <motion.img
          key={current}
          src={images[current]}
          alt={`Floor ${current + 1}`}
          className={styles.floorImage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Кнопки для переключения этажей */}
      <button className={styles.upButton} onClick={goUp}>
        ▲
      </button>
      <button className={styles.downButton} onClick={goDown}>
        ▼
      </button>

      <div className={styles.floorIndicator}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === current ? styles.active : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FloorViewer;
