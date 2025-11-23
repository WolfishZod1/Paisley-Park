import Undo from "@/components/svg/Undo";
import styles from "./styles.module.scss";
import HeaderButtonWithoutAnimation from "@/components/buttons/headerButtonWithoutAnimation";

const UndoButton = ({ onClick }: { onClick: () => void }) => (
  <HeaderButtonWithoutAnimation>
    <Undo onClick={onClick} className={styles.svg_btn} />
  </HeaderButtonWithoutAnimation>
);

export default UndoButton;
