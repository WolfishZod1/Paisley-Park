"use client";

import { useState, HTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";

type MainTextProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  subText: string;
};

const MainText = ({ text, subText, ...props }: MainTextProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.mainTextWrapper} {...props}>
      <div className={styles.textRow}>
        <h1 className={styles.mainText}>{text}</h1>
        <button
          className={`${styles.infoButton}`}
          onClick={() => setShowInfo((prev) => !prev)}
        >
          ⓘ
        </button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            className={styles.subText}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut", type: "spring" }}
          >
            {subText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainText;
