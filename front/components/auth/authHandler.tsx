"use client";

import api from "@/http/api";
import { logIn, logOut } from "@/store/authSlice";
import { setUser } from "@/store/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { makeConfetti } from "../confetti/Confetti";

export default function AuthHandler() {
  const dispatch = useDispatch();

  if (typeof window !== "undefined") {
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("token") !== null
    ) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refreshAccessToken`,
          {},
          { withCredentials: true }
        )
        .then(async (res) => {
          const userData = await axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            })
            .then((res1) => {
              dispatch(logIn(res.data.accessToken));
              return res1;
            });

          try {
            api.post("/task-completion", { taskId: 1 }).then((res) => {
              if (res.data === "DONE ALREADY") {
                return;
              } else {
                toast.success("Достижение: Вы зарегистрировались!", {
                  id: "123",
                  style: {
                    backgroundColor: "rgba(180, 0, 0, 0.55)",
                    outline: "2px solid #941d3a",
                    color: "white",
                    backdropFilter: "blur(2px)",
                  },
                });
              }
              makeConfetti();
            });
          } catch (error) {}

          dispatch(
            setUser({
              email: userData.data.email,
              role: userData.data.role.name,
              loggedWith: userData.data.loggedWith,
              avatar: userData.data.profile.avatar,
              name: userData.data.profile.name,
              header: userData.data.profile.header,
              groupId: userData.data.userGroupAnalysisId,
            })
          );
        })
        .catch((error) => {
          dispatch(logOut());
          // console.error(error);
        });
    }

    return null;
  }
}
