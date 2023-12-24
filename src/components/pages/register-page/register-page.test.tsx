import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/test-utils";
import RegisterPage from "./register-page";

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

  // Test for submitting form with invalid fields

  // Test for successfully submitting form

  // Test for user with same credentials already exists

  // Test login link
});
