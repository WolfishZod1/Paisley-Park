import styles from "./styles.module.scss";

import ResetButton from "./ResetButton";
import UndoButton from "./UndoButton";
import ColorPickerButton from "./ColorPickerButton";
import SubmitButton from "./SubmitButton";

type props = {
  clear: () => void;
  undo: () => void;
  togglePicker: () => void;
  submit: () => void;
};

const CanvasActions = ({ clear, undo, togglePicker, submit }: props) => {
  return (
    <div className={styles.actions}>
      <ResetButton onClick={clear} />
      <UndoButton onClick={undo} />
      <ColorPickerButton onClick={togglePicker} />
      <SubmitButton onClick={submit} />
    </div>
  );
};

export default CanvasActions;
