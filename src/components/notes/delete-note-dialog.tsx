import { Note, useDeleteNote } from "@/apis/notes-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useSessionStore from "@/stores/session-store";
import { useToast } from "../ui/use-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  note: Note | undefined;
};

export const DeleteNoteDialog = ({ open, onClose, note }: Props) => {
  const { session } = useSessionStore();
  const deleteNote = useDeleteNote(session?.id);
  const { toast } = useToast();

  const onDeleteNote = () => {
    deleteNote.mutate(note!.id, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        toast({
          title: "Delete Note",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this note?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteNote}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
