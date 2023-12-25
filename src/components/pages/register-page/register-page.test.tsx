import { describe, expect, it } from "vitest";
import { HttpResponse, http } from "msw";

import { render, screen, userEvent, waitFor } from "@/tests/test-utils";
import RegisterPage from "./register-page";
import { server } from "@/tests/server";

describe("Register Page", () => {
  it("renders the page correctly", () => {
    render(<RegisterPage />);

    const registerHeader = screen.getByRole("heading", { name: /register/i });
    expect(registerHeader).toBeInTheDocument();

    const registerSubHeader = screen.getByText(
      /create a new notesnap account\./i,
    );
    expect(registerSubHeader).toBeInTheDocument();

    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    expect(lastNameInput).toBeInTheDocument();

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();

    const loginLink = screen.getByRole("link", {
      name: /already have an account\? login instead\./i,
    });
    expect(loginLink).toBeInTheDocument();
  });

  it("displays the proper error messages when form is submitted with invalid fields", async () => {
    userEvent.setup();

    render(<RegisterPage />);

    const registerButton = screen.getByRole("button", { name: /register/i });
    await userEvent.click(registerButton);

    const firstNameInputErrorMessage = screen.getByText(
      /first name is required/i,
    );
    expect(firstNameInputErrorMessage).toBeInTheDocument();

    const lastNameInputErrorMessage = screen.getByText(
      /last name is required/i,
    );
    expect(lastNameInputErrorMessage).toBeInTheDocument();

    const emailInputErrorMessage = screen.getByText(/email is required/i);
    expect(emailInputErrorMessage).toBeInTheDocument();

    const passwordInputErrorMessage = screen.getByText(/password is required/i);
    expect(passwordInputErrorMessage).toBeInTheDocument();
  });

  it("redirects the page to login page when form is submitted with valid fields", async () => {
    userEvent.setup();

    render(<RegisterPage />);

    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.type(firstNameInput, "First Name");
    expect(firstNameInput).toHaveValue("First Name");

    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.type(lastNameInput, "Last Name");
    expect(lastNameInput).toHaveValue("Last Name");

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInput, "email@gmail.com");
    expect(emailInput).toHaveValue("email@gmail.com");

    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, "Password12345!");
    expect(passwordInput).toHaveValue("Password12345!");

    const registerButton = screen.getByRole("button", { name: /register/i });
    await userEvent.click(registerButton);
    await waitFor(() => expect(window.location.href).toContain("/login"));
  });

  it("displays an error when a user already exists", async () => {
    userEvent.setup();

    server.use(
      http.post("*/auth/register", () => {
        return HttpResponse.json(
          { message: "User already exists." },
          { status: 409 },
        );
      }),
    );

    render(<RegisterPage />);

    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.type(firstNameInput, "First Name");

    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.type(lastNameInput, "Last Name");

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    await userEvent.type(emailInput, "email@gmail.com");

    const passwordInput = screen.getByLabelText(/password/i);
    await userEvent.type(passwordInput, "password");

    const registerButton = screen.getByRole("button", { name: /register/i });
    await userEvent.click(registerButton);

    const registerUserToastTitle = screen.getByText(/register user/i);
    expect(registerUserToastTitle).toBeInTheDocument();

    const registerUserToastDescription =
      screen.getByText(/user already exists./i);
    expect(registerUserToastDescription).toBeInTheDocument();
  });

  it("navigates to login page when login link is clicked", async () => {
    userEvent.setup();

    render(<RegisterPage />);

    const loginLink = screen.getByRole("link", {
      name: /already have an account\? login instead\./i,
    });
    await userEvent.click(loginLink);

    await waitFor(() => expect(window.location.href).toContain("/login"));
  });
});
