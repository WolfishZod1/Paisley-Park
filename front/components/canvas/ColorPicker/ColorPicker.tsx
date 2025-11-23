"use client";

import { HexColorPicker } from "react-colorful";
import styles from "./styles.module.scss";
import { forwardRef } from "react";

interface ColorPickerProps {
  color: string;
  setColor: (value: string) => void;
}

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ color, setColor }, ref) => {
    return (
      <div ref={ref} className={styles.color_picker}>
        <HexColorPicker
          style={{ margin: "0 auto" }}
          color={color}
          onChange={setColor}
        />
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
export default ColorPicker;
