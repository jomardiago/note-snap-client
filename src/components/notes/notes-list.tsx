import { Note } from "@/apis/notes-api";

type Props = {
  notes: Array<Note>;
};

export const NotesList = ({ notes }: Props) => {
  return (
    <>
      {notes.map((note) => (
        <div className="border shadow-md p-4 min-h-[200px]">
          <h2 className="text-lg font-semibold">{note.title}</h2>
          <p className="text-gray-700 mt-4">{note.description}</p>
        </div>
      ))}
    </>
  );
};
