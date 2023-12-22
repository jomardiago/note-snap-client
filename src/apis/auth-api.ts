import { useMutation } from "@tanstack/react-query";

import api from "./api";
import { MessageResponse } from "./types";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const register = (data: RegisterData): Promise<MessageResponse> => {
  return api
    .post("/auth/register", data)
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
