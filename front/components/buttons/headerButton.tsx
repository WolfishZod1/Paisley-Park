import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

interface HeaderButtonProps {
  children: ReactNode;
  text: string;
  needAnimate: boolean;
  onClick?: () => void;
  hidden?: boolean;
}

const VARIANTS = {
  initial: {
    width: "30px",
  },

  animate: {
    width: "max-content",
  },
  exit: {
    width: "30px",
  },
};

const TEXT_VARIANTS = {
  initial: {
    color: "rgba(99,99,99,0)",
  },
  animate: {
    color: "rgba(99,99,99,1)",
  },
  exit: {
    width: "rgba(99,99,99,0)",
  },
};

function HeaderButton({
  onClick,
  children,
  text,
  needAnimate,
}: HeaderButtonProps) {
  return (
    <motion.div
      onClick={onClick}
      variants={VARIANTS}
      initial="initial"
      animate={needAnimate ? "animate" : "initial"}
      exit="exit"
      className={styles.btn_cont}
    >
      <div className={styles.img}>{children}</div>
      <motion.h2
        variants={TEXT_VARIANTS}
        initial="initial"
        animate={needAnimate ? "animate" : "initial"}
        className={styles.btn_text}
        style={{ margin: 0 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
}

export default HeaderButton;
