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
export type UpdateNoteData = CreateNoteData;

export type UpdateNoteParams = {
  id: string;
  data: UpdateNoteData;
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

const createNote = (data: CreateNoteData): Promise<MessageResponse> => {
  return api
    .post("/notes", data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

const updateNote = ({
  id,
  data,
}: UpdateNoteParams): Promise<MessageResponse> => {
  return api
    .patch(`/notes/${id}`, data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

const deleteNote = (id: string): Promise<MessageResponse> => {
  return api
    .delete(`/notes/${id}`, getApiHeaders())
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

export const useUpdateNote = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
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

export const useDeleteNote = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
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
