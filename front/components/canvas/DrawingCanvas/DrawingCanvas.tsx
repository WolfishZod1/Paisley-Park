"use client";

import CanvasDraw from "react-canvas-draw";
import styles from "./styles.module.scss";
import { MutableRefObject } from "react";

interface DrawingCanvasProps {
  canvasRef: MutableRefObject<CanvasDraw | null>;
  color: string;
}

const DrawingCanvas = ({ canvasRef, color }: DrawingCanvasProps) => {
  return (
    <div className={styles.container}>
      <CanvasDraw
        ref={canvasRef}
        brushColor={color}
        brushRadius={3}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default DrawingCanvas;
