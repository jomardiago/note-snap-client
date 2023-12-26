import { describe, expect, it } from "vitest";
import { HttpResponse, http } from "msw";

import MainPage from "./main-page";
import useSessionStore from "@/stores/session-store";
import { render, screen, userEvent, waitFor } from "@/tests/test-utils";
import { LOGIN_RESPONSE, NOTES } from "@/tests/dummy-data";
import { server } from "@/tests/server";

describe("Main Page", () => {
  const setSession = useSessionStore.getState().setSession;
  setSession(LOGIN_RESPONSE);

  it("renders the component correctly", async () => {
    render(<MainPage />);

    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /new note/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /note title/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/note description/i)).toBeInTheDocument();
    expect(screen.getByTestId("edit-note-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-note-button")).toBeInTheDocument();
  });

  it("should display the note form when new note button is clicked", async () => {
    userEvent.setup();

    render(<MainPage />);

    const newNoteButton = screen.getByRole("button", { name: /new note/i });
    await userEvent.click(newNoteButton);

    const titleInput = screen.getByRole("textbox", { name: /title/i });
    expect(titleInput).toBeInTheDocument();

    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    expect(descriptionInput).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeInTheDocument();
  });

  it("should display the correct error messages when form is submitted with invalid values", async () => {
    userEvent.setup();

    render(<MainPage />);

    const newNoteButton = screen.getByRole("button", { name: /new note/i });
    await userEvent.click(newNoteButton);

    const saveButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });

  it("should hide the note form when close button is clicked", async () => {
    userEvent.setup();

    render(<MainPage />);

    const newNoteButton = screen.getByRole("button", { name: /new note/i });
    await userEvent.click(newNoteButton);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    const titleInput = screen.queryByRole("textbox", { name: /title/i });
    expect(titleInput).not.toBeInTheDocument();

    const descriptionInput = screen.queryByRole("textbox", {
      name: /description/i,
    });
    expect(descriptionInput).not.toBeInTheDocument();

    expect(closeButton).not.toBeInTheDocument();

    const saveButton = screen.queryByRole("button", { name: /save/i });
    expect(saveButton).not.toBeInTheDocument();
  });

  it("creates a new note successfully", async () => {
    userEvent.setup();

    render(<MainPage />);

    const title = "New Note";
    const description = "New Note Description";

    const newNoteButton = screen.getByRole("button", { name: /new note/i });
    await userEvent.click(newNoteButton);

    const titleInput = screen.getByRole("textbox", { name: /title/i });
    await userEvent.type(titleInput, title);
    expect(titleInput).toHaveValue(title);

    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    await userEvent.type(descriptionInput, description);
    expect(descriptionInput).toHaveValue(description);

    server.use(
      http.get("*/notes", () => {
        return HttpResponse.json([...NOTES, { title, description }], {
          status: 200,
        });
      }),
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveButton);

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("displays the error when create note throws an error", async () => {
    server.use(
      http.post("*/notes", () => {
        return HttpResponse.json(
          {
            message: "Internal Server Error",
          },
          { status: 500 },
        );
      }),
    );

    userEvent.setup();

    render(<MainPage />);

    const title = "New Note";
    const description = "New Note Description";

    const newNoteButton = screen.getByRole("button", { name: /new note/i });
    await userEvent.click(newNoteButton);

    const titleInput = screen.getByRole("textbox", { name: /title/i });
    await userEvent.type(titleInput, title);

    const descriptionInput = screen.getByRole("textbox", {
      name: /description/i,
    });
    await userEvent.type(descriptionInput, description);

    const saveButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(saveButton);

    const errorToastTitle = screen.getByText(/create note/i);
    expect(errorToastTitle).toBeInTheDocument();

    const errorToastDescription = screen.getByText(/internal server error/i);
    expect(errorToastDescription).toBeInTheDocument();
  });

  // Test Update Note as Success

  // Test Update Note as Error

  // Test Delete Note as Success

  // Test Delete Note as Error
});
