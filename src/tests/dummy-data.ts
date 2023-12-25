import { Note } from "@/apis/notes-api";
import { Session } from "@/stores/session-store";

export const LOGIN_RESPONSE: Session = {
  id: "0",
  firstName: "First Name",
  lastName: "Last Name",
  email: "firstlast@gmail.com",
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  accessToken: "myAccessToken",
};

export const NOTES: Array<Note> = [
  {
    id: "noteId",
    title: "Note Title",
    description: "Note Description",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    userId: "userId",
  },
];
