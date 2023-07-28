// Login.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("renders login page correctly", () => {
    render(<Login />);

    // Check if the login form is rendered
    const loginForm = screen.getByLabelText(/Username:/i);
    expect(loginForm).toBeInTheDocument();

    // Check if the login button is rendered
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test("validates password constraints correctly", () => {
    render(<Login />);

    // Enter invalid password with fewer than 6 characters
    const passwordInput = screen.getByLabelText(/Password:/i);
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Check if the error message is displayed for password length constraint
    const passwordError = screen.getByText(
      /Password must be at least 6 characters long./i
    );
    expect(passwordError).toBeInTheDocument();

    // Enter invalid password with consecutive characters
    fireEvent.change(passwordInput, { target: { value: "abcddde" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Check if the error message is displayed for consecutive characters constraint
    const consecutiveCharactersError = screen.getByText(
      /Password cannot have more than 2 consecutive characters./i
    );
    expect(consecutiveCharactersError).toBeInTheDocument();

    // Enter valid password
    fireEvent.change(passwordInput, { target: { value: "validP@ssword" } });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Check if the error messages are not displayed and the form is submitted
    expect(passwordError).not.toBeInTheDocument();
    expect(consecutiveCharactersError).not.toBeInTheDocument();
  });

  test("text color should be red", () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText(/Password:/i);

    // Enter valid password with at least 6 characters
    fireEvent.change(passwordInput, { target: { value: "abc" } });
    const element = screen.getByText("at least 6 characters");
    const styles = getComputedStyle(element);

    expect(styles.backgroundColor).toBe("red");
  });

  test("displays mini checkboxes for password constraints", () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText(/Password:/i);

    // Enter valid password with at least 6 characters
    fireEvent.change(passwordInput, { target: { value: "validP@ssword" } });

    // Check if the mini checkbox for password length constraint is displayed
    const passwordLengthCheckbox = screen.getByText(/✓/);
    expect(passwordLengthCheckbox).toBeInTheDocument();

    // Enter valid password without consecutive characters
    fireEvent.change(passwordInput, { target: { value: "noConsecutives1!" } });

    // Check if the mini checkbox for consecutive characters constraint is displayed
    const consecutiveCharactersCheckbox = screen.getByText(/✓/);
    expect(consecutiveCharactersCheckbox).toBeInTheDocument();

    // Enter invalid password with consecutive characters
    fireEvent.change(passwordInput, { target: { value: "abcddde" } });

    // Check if the mini checkbox for consecutive characters constraint is not displayed
    expect(consecutiveCharactersCheckbox).not.toBeInTheDocument();
  });
});
