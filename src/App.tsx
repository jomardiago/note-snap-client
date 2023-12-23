import { useState } from "react";

import { Note, useGetNotes } from "./apis/notes-api";
import MainLayout from "./components/layouts/main-layout";
import { Button } from "./components/ui/button";
import useSessionStore from "./stores/session-store";
import { NotesList } from "./components/notes/notes-list";
import { NoteForm } from "./components/notes/note-form";

export default function App() {
  const { session } = useSessionStore();
  const notes = useGetNotes(session?.id);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);

  const editNote = (id: string) => {
    const note = notes.data!.find((note) => note.id === id);
    setSelectedNote(note);
    setShowNoteForm(true);
  };

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
            <NoteForm
              onClose={() => setShowNoteForm(false)}
              note={selectedNote}
            />
          </div>
        )}

        <NotesList notes={notes.data || []} editNote={editNote} />
      </div>
    </MainLayout>
  );
}
