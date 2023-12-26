import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Note, useCreateNote, useUpdateNote } from "@/apis/notes-api";
import useSessionStore from "@/stores/session-store";
import { useToast } from "../ui/use-toast";

type Props = {
  onClose: () => void;
  note?: Note;
};

const formSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, {
      message: "Title is required",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, {
      message: "Description is required",
    }),
});

export const NoteForm = ({ onClose, note }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note?.title || "",
      description: note?.description || "",
    },
  });
  const { session } = useSessionStore();
  const createNote = useCreateNote(session?.id);
  const updateNote = useUpdateNote(session?.id);
  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!note) {
      createNote.mutate(values, {
        onSuccess: () => {
          form.reset({
            title: "",
            description: "",
          });
        },
        onError: (error) => {
          toast({
            title: "Create Note",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } else {
      updateNote.mutate(
        { id: note.id, data: values },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            toast({
              title: "Update Note",
              description: error.message,
              variant: "destructive",
            });
          },
        },
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Title"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description"
                  autoComplete="off"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
