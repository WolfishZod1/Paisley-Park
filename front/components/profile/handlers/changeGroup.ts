import api from "@/http/api";
import { toast } from "react-hot-toast";
import { setNewGroupId } from "@/store/userSlice";
import { AppDispatch } from "@/store";
import { makeConfetti } from "@/components/confetti/Confetti";

export const changeGroup = (
  newGroupId: number | null,
  dispatch: AppDispatch
) => {
  api
    .put("/user/group", { newGroupId })
    .then((res) => {
      toast.success("Роль успешно изменена", {
        style: {
          backgroundColor: "rgba(180, 0, 0, 0.55)",
          outline: "2px solid #941d3a",
          color: "white",
          backdropFilter: "blur(2px)",
        },
        iconTheme: { primary: "#a8cd9f", secondary: "white" },
      });

      try {
        api.post("/task-completion", { taskId: 6 }).then((res) => {
          if (res.data === "DONE ALREADY") {
            return;
          } else {
            console.log(res.data);
            makeConfetti();
            toast.success("Достижение: Вы сменили роль!", {
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

      dispatch(setNewGroupId({ groupId: res.data.newGroupId }));
    })
    .catch((error) => {
      toast.error("Произошла ошибка", {
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
