import Airplane from "@/components/svg/Airplane";
import styles from "./styles.module.scss";
import HeaderButtonWithoutAnimation from "@/components/buttons/headerButtonWithoutAnimation";

const SubmitButton = ({ onClick }: { onClick: () => void }) => (
  <HeaderButtonWithoutAnimation>
    <Airplane onClick={onClick} className={styles.svg_btn} />
  </HeaderButtonWithoutAnimation>
);

export default SubmitButton;
