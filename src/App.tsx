import { useGetNotes } from "./apis/notes-api";
import MainLayout from "./components/layouts/main-layout";
import useSessionStore from "./stores/session-store";

export default function App() {
  const { session } = useSessionStore();
  const notes = useGetNotes(session?.id);

  if (notes.isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-8">
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
