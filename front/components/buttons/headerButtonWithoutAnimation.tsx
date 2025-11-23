import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface HeaderButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

function HeaderButtonWithoutAnimation({
  onClick,
  children,
}: HeaderButtonProps) {
  return (
    <div onClick={onClick} style={{ width: 30 }} className={styles.btn_cont}>
      <div className={styles.img}>{children}</div>
    </div>
  );
}

export default HeaderButtonWithoutAnimation;
