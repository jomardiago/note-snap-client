import { describe, expect, it } from "vitest";
import { HttpResponse, http } from "msw";

import LoginPage from "./login-page";
import { render, screen, userEvent, waitFor } from "@/tests/test-utils";
import { LOGIN_RESPONSE } from "@/tests/dummy-data";
import useSessionStore from "@/stores/session-store";
import { server } from "@/tests/server";

describe("Login Page", () => {
  it("renders the page correctly", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByText(/welcome back, log back in to your account/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /need a new account\? register instead\./i,
      }),
    ).toBeInTheDocument();
  });

  it("displays the error messages when form is submitted with invalid values", async () => {
    userEvent.setup();

    render(<LoginPage />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/password must be atleast 8 characters/i),
    ).toBeInTheDocument();
  });

  it("sets the session store when form is submitted with valid values", async () => {
    userEvent.setup();

    render(<LoginPage />);

    const email = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(email, LOGIN_RESPONSE.email);
    expect(email).toHaveValue(LOGIN_RESPONSE.email);

    const password = screen.getByLabelText(/password/i);
    await userEvent.type(password, "Password12345!");
    expect(password).toHaveValue("Password12345!");

    const loginButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);

    const session = useSessionStore.getState().session;
    expect(session).toStrictEqual(LOGIN_RESPONSE);
  });

  it("shows an error toast notification when login user api returns an error", async () => {
    server.use(
      http.post("*/auth/login", () => {
        return HttpResponse.json(
          { message: "User not found." },
          { status: 404 },
        );
      }),
    );

    userEvent.setup();

    render(<LoginPage />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInput, "email@gmail.com");

    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, "password");

    const loginButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);

    const loginUserToastTitle = screen.getByText(/login user/i);
    expect(loginUserToastTitle).toBeInTheDocument();

    const loginUserToastDescription = screen.getByText(/user not found./i);
    expect(loginUserToastDescription).toBeInTheDocument();
  });

  it("navigates to register page when register link is clicked", async () => {
    userEvent.setup();

    render(<LoginPage />);

    const setSession = useSessionStore.getState().setSession;
    setSession(undefined);

    const registerLink = screen.getByRole("link", {
      name: /need a new account\? register instead\./i,
    });
    await userEvent.click(registerLink);

    // TODO: Investigate why this test is failing, almost the same with register test but register is passing
    // and this one is failing.
    await waitFor(() => expect(window.location.href).toContain("/register"));
  });
});
