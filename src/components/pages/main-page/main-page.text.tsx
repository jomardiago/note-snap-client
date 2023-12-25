import { describe, expect, it } from "vitest";

import MainPage from "./main-page";
import useSessionStore from "@/stores/session-store";
import { render, screen, waitFor } from "@/tests/test-utils";
import { LOGIN_RESPONSE } from "@/tests/dummy-data";

describe("Main Page", () => {
  it("renders the component correctly", async () => {
    const setSession = useSessionStore.getState().setSession;

    render(<MainPage />);
    setSession(LOGIN_RESPONSE);

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
});
