import useSessionStore from "@/stores/session-store";
import { Button } from "../ui/button";

export const Header = () => {
  const { setSession } = useSessionStore();

  return (
    <div className="h-14 shadow-md border-b flex items-center justify-between px-8">
      <h1 className="text-2xl font-semibold">NoteSnap</h1>
      <Button variant="outline" onClick={() => setSession(undefined)}>
        Logout
      </Button>
    </div>
  );
};
