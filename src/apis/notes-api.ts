import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api, { getApiHeaders } from "./api";
import { MessageResponse } from "./types";

export type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type CreateNoteData = Pick<Note, "title" | "description">;

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

const createNote = (data: CreateNoteData): Promise<MessageResponse> => {
  return api
    .post("/notes", data, getApiHeaders())
    .then((response) => response.data)
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

export const useCreateNote = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.byUser(userId),
      });
    },
    onError: (error: MessageResponse) => {
      return error;
    },
  });
};
