import { useState } from "react";

import { useGetNotes } from "@/apis/notes-api";
import useSessionStore from "@/stores/session-store";
import { Button } from "@/components/ui/button";
import { NoteForm } from "@/components/notes/note-form";
import { NotesList } from "@/components/notes/notes-list";

export default function MainPage() {
  const { session } = useSessionStore();
  const notes = useGetNotes(session?.id);
  const [showNoteForm, setShowNoteForm] = useState(false);

  const createNote = () => {
    setShowNoteForm(true);
  };

  return (
    <div>
      {notes.isLoading && <span>Loading...</span>}

      {notes.data?.length === 0 && (
        <p className="text-lg text-gray-700 mb-4">Start adding a new note...</p>
      )}

      <Button onClick={createNote}>New Note</Button>

      <div className="grid grid-cols-4 gap-8 mt-4">
        {showNoteForm && (
          <div className="border shadow-md p-4 min-h-[200px]">
            <NoteForm onClose={() => setShowNoteForm(false)} />
          </div>
        )}

        <NotesList notes={notes.data || []} />
      </div>
    </div>
  );
}
