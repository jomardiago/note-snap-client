import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Session = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
};

interface SessionState {
  session: Session | undefined;
  setSession: (session: Session | undefined) => void;
}

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: undefined,
      setSession: (session) => set(() => ({ session })),
    }),
    { name: "sessionStore" },
  ),
);

export default useSessionStore;
