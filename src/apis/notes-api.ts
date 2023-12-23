import { useQuery } from "@tanstack/react-query";

import api, { getApiHeaders } from "./api";

type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

const queryKeys = {
  root: ["notes"],
  byUser: (userId: string | undefined) => [...queryKeys.root, userId],
};

const getNotes = (): Promise<Array<Note>> => {
  return api
    .get("/notes", getApiHeaders())
    .then((request) => request.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useGetNotes = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.byUser(userId),
    queryFn: getNotes,
  });
};
