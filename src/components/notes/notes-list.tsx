import { useState } from "react";
import { Edit, X } from "lucide-react";

import { Note } from "@/apis/notes-api";
import { DeleteNoteDialog } from "./delete-note-dialog";

type Props = {
  notes: Array<Note>;
  editNote: (id: string) => void;
};

type DeleteNoteState = {
  open: boolean;
  note: Note | undefined;
};

export const NotesList = ({ notes, editNote }: Props) => {
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
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <button>
              <Edit
                className="w-4 h-4 text-yellow-500"
                onClick={() => editNote(note.id)}
              />
            </button>
          </div>
          <p className="text-gray-700 mt-4">{note.description}</p>
        </div>
      ))}
    </>
  );
};
