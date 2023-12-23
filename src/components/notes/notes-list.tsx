import { Note } from "@/apis/notes-api";
import { Edit, X } from "lucide-react";

type Props = {
  notes: Array<Note>;
};

export const NotesList = ({ notes }: Props) => {
  return (
    <>
      {notes.map((note) => (
        <div className="border shadow-md p-4 min-h-[200px] relative">
          <button className="absolute top-0 right-0 p-2">
            <X className="w-4 h-4 text-red-700" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <button>
              <Edit className="w-4 h-4 text-yellow-500" />
            </button>
          </div>
          <p className="text-gray-700 mt-4">{note.description}</p>
        </div>
      ))}
    </>
  );
};
