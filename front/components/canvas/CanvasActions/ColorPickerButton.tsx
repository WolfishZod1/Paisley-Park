import Colors from "@/components/svg/Colors";
import styles from "./styles.module.scss";
import HeaderButtonWithoutAnimation from "@/components/buttons/headerButtonWithoutAnimation";

const ColorPickerButton = ({ onClick }: { onClick: () => void }) => (
  <HeaderButtonWithoutAnimation onClick={onClick}>
    <Colors onClick={() => {}} className={styles.svg_btn} />
  </HeaderButtonWithoutAnimation>
);

export default ColorPickerButton;
