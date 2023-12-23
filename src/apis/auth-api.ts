import { useMutation } from "@tanstack/react-query";

import api from "./api";
import { MessageResponse } from "./types";
import { Session } from "@/stores/session-store";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginData = Pick<RegisterData, "email" | "password">;

const register = (data: RegisterData): Promise<MessageResponse> => {
  return api
    .post("/auth/register", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

const login = (data: LoginData): Promise<Session> => {
  return api
    .post("/auth/login", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onError: (error: MessageResponse) => {
      return error;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (error: MessageResponse) => {
      return error;
    },
  });
};
