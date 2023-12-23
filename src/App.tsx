import { useState } from "react";

import { useGetNotes } from "./apis/notes-api";
import MainLayout from "./components/layouts/main-layout";
import { Button } from "./components/ui/button";
import useSessionStore from "./stores/session-store";

export default function App() {
  const { session } = useSessionStore();
  const notes = useGetNotes(session?.id);
  const [showNoteForm, setShowNoteForm] = useState(false);

  return (
    <MainLayout>
      {notes.isLoading && <span>Loading...</span>}

      {notes.data?.length === 0 && (
        <p className="text-lg text-gray-700 mb-4">Start adding a new note...</p>
      )}

      <Button onClick={() => setShowNoteForm(true)}>New Note</Button>

      <div className="grid grid-cols-4 gap-8 mt-4">
        {showNoteForm && (
          <div className="border shadow-md p-4 min-h-[200px]">
            <span>Note Form</span>
          </div>
        )}

        {notes.data &&
          notes.data.map((note) => (
            <div className="border shadow-md p-4 min-h-[200px]">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-gray-700 mt-4">{note.description}</p>
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
