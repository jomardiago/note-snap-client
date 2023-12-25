import { useState } from "react";
import { Edit } from "lucide-react";

import { Note } from "@/apis/notes-api";
import { NoteForm } from "./note-form";

type Props = {
  note: Note;
};

export const NoteItem = ({ note }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing ? (
        <>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <button>
              <Edit
                className="w-4 h-4 text-yellow-500"
                onClick={() => setIsEditing(true)}
                aria-label="Edit Note"
                data-testid="edit-note-button"
              />
            </button>
          </div>
          <p className="text-gray-700 mt-4">{note.description}</p>
        </>
      ) : (
        <NoteForm onClose={() => setIsEditing(false)} note={note} />
      )}
    </>
  );
};
