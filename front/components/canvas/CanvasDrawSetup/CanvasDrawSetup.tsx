"use client";

import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import axios from "axios";

import CanvasActions from "../CanvasActions/CanvasActions";
import ColorPicker from "../ColorPicker/ColorPicker";
import DrawingCanvas from "../DrawingCanvas/DrawingCanvas";

import { useClickOutside } from "@/hook/useClickOutside";
import ShinyText from "@/components/ShinyText/ShinyText";
import { makeConfetti } from "@/components/confetti/Confetti";
import toast from "react-hot-toast";
import api from "@/http/api";
import WelcomeMessage from "@/components/WelcomeMessage/WelcomeMessage";

const submitHandler = async (
  base64String: string,
  setIsFetching: (v: boolean) => void,
  setIsError: (v: boolean) => void
) => {
  try {
    setIsError(false);
    const formData = new FormData();

    formData.append(
      "prompt",
      "Вот рисунок, сделанный пользователем. Проанализируй его и составь психологические рекомендации."
    );

    // Преобразуем base64 → Blob (файлоподобный объект)
    const byteString = atob(base64String.split(",")[1]);
    const mimeMatch = base64String.split(",")[0].match(/:(.*?);/);
    const mimeString = mimeMatch ? mimeMatch[1] : "image/png";

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    formData.append("image", blob, "drawing.jpg");

    const res = await axios.post(
      `https://ngtu.chermi6267.netcraze.pro/mental/generate`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setIsFetching(false);

    return String(res.data.response);
  } catch (error) {
    console.error(error);
    setIsError(true);
    return null;
  }
};

const CanvasDrawSetup = () => {
  const canvasRef = useRef<any>(null);
  const [color, setColor] = useState("#000000ff");
  const [colorPickerIsActive, setColorPickerIsActive] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [LLMAnswer, setLLMAnswer] = useState<string | null>("");

  const pickerRef = useRef(null);
  useClickOutside(pickerRef, () => setColorPickerIsActive(false));

  const clear = () => canvasRef.current?.clear();
  const undo = () => canvasRef.current?.undo();

  const submit = async () => {
    const canvasContainer = canvasRef.current.canvasContainer;
    const drawingCanvas = canvasContainer.children[1];
    const image = drawingCanvas.toDataURL("image/png");

    setIsFetching(true);
    const res = await submitHandler(image, setIsFetching, setIsError);

    setLLMAnswer(res);
    try {
      api.post("/task-completion", { taskId: 7 }).then((res) => {
        if (res.data === "DONE ALREADY") {
          return;
        } else {
          makeConfetti();
          toast.success("Поздравляем!", {
            id: "asdf",
            style: {
              backgroundColor: "rgba(180, 0, 0, 0.55)",
              outline: "2px solid #941d3a",
              color: "white",
              backdropFilter: "blur(2px)",
            },
          });
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <WelcomeMessage text="Здесь ты можешь быть собой" emoji="" />
      <div className={styles.canvas}>
        {colorPickerIsActive && (
          <ColorPicker ref={pickerRef} color={color} setColor={setColor} />
        )}

        <div className={styles.answer_cont}>
          <div className={styles.answer_cont__answer}>
            <ShinyText className={styles.answer__title} text="Штрих Души" />
            <p style={{ fontSize: "larger", padding: "7px" }}>
              {isFetching && !isError ? (
                <ShinyText text="Мгновение и будет готово" />
              ) : (
                LLMAnswer
              )}
            </p>
          </div>

          <CanvasActions
            clear={clear}
            undo={undo}
            submit={submit}
            togglePicker={() => setColorPickerIsActive(true)}
          />
        </div>

        <DrawingCanvas canvasRef={canvasRef} color={color} />
      </div>
      <p
        style={{
          position: "fixed",
          bottom: 5,
          right: 5,
          fontSize: "smaller",
          textAlign: "center",
        }}
      >
        *Это не медконсультация, отвечает нейросеть
      </p>
    </>
  );
};

export default CanvasDrawSetup;
