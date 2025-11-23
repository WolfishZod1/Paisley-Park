import Reset from "@/components/svg/Reset";
import styles from "./styles.module.scss";
import HeaderButtonWithoutAnimation from "@/components/buttons/headerButtonWithoutAnimation";

const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <HeaderButtonWithoutAnimation>
    <Reset onClick={onClick} className={styles.svg_btn} />
  </HeaderButtonWithoutAnimation>
);

export default ResetButton;
