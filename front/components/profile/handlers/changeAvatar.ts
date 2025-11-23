import api from "@/http/api";
import { toast } from "react-hot-toast";
import { setNewAvatar } from "@/store/userSlice";
import { logIn } from "@/store/authSlice";
import { AppDispatch } from "@/store";
import { makeConfetti } from "@/components/confetti/Confetti";

export const changeAvatarHandler = (
  file: File,
  dispatch: AppDispatch,
  avatarInputRef: React.RefObject<HTMLInputElement | null>
) => {
  const formData = new FormData();
  formData.append("file", file);

  api
    .put("/user/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      toast.success("Фото профиля изменено", {
        style: {
          backgroundColor: "rgba(180, 0, 0, 0.55)",
          outline: "2px solid #941d3a",
          color: "white",
          backdropFilter: "blur(2px)",
        },
        iconTheme: { primary: "#a8cd9f", secondary: "white" },
      });
      localStorage.setItem("token", res.data.accessToken);
      dispatch(setNewAvatar({ avatar: res.data.avatar }));
      dispatch(logIn(res.data.accessToken));
      if (avatarInputRef && avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }

      try {
        api.post("/task-completion", { taskId: 2 }).then((res) => {
          if (res.data === "DONE ALREADY") {
            return;
          } else {
            console.log(res.data);
            makeConfetti();
            toast.success("Достижение: Вы сменили аватар!", {
              id: "1233",
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
    })
    .catch((error) => {
      toast.error("Не смогли обновить фото профиля. Попробуйте позже", {
        style: {
          backgroundColor: "rgba(180, 0, 0, 0.55)",
          outline: "2px solid #941d3a",
          color: "white",
          backdropFilter: "blur(2px)",
        },
        iconTheme: { primary: "#eb4335", secondary: "white" },
      });
      console.error(error);
    });
};
