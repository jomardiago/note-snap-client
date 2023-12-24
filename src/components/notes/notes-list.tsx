import { useState } from "react";
import { X } from "lucide-react";

import { Note } from "@/apis/notes-api";
import { DeleteNoteDialog } from "./delete-note-dialog";
import { NoteItem } from "./note-item";

type Props = {
  notes: Array<Note>;
};

type DeleteNoteState = {
  open: boolean;
  note: Note | undefined;
};

export const NotesList = ({ notes }: Props) => {
  const [deleteNoteState, setDeleteNoteState] = useState<DeleteNoteState>({
    open: false,
    note: undefined,
  });

  return (
    <>
      <DeleteNoteDialog
        open={deleteNoteState.open}
        note={deleteNoteState.note}
        onClose={() => setDeleteNoteState({ open: false, note: undefined })}
      />

      {notes.map((note) => (
        <div
          key={note.id}
          className="border shadow-md p-4 min-h-[200px] relative"
        >
          <button
            className="absolute top-0 right-0 p-2"
            onClick={() => setDeleteNoteState({ open: true, note })}
          >
            <X className="w-4 h-4 text-red-700" />
          </button>

          <NoteItem note={note} />
        </div>
      ))}
    </>
  );
};
