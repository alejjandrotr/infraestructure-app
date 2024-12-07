import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AuthProvider } from "../../core/Users/context/auth.context";
import { userRepository } from "../../core/Users/user.api";
import SignInPage from "./SignIn";
import toast from "react-hot-toast";

// Mock del userRepository para simular la respuesta del login
jest.mock("../../core/Users/user.api");

describe("SignInPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar Sesion/i })
    ).toBeInTheDocument();
  });

  test("displays error message on invalid login", async () => {
    (userRepository.login as jest.Mock).mockImplementation(() => {
      console.log("called");
      throw new Error("Usuario y/o Contraseña invalidos");
    });

    render(
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/Usuario/i), {
      target: { value: "wrongUser" },
    });
    fireEvent.input(screen.getByLabelText(/Contraseña/i), {
      target: { value: "wrongPassword" },
    });

    // Wrap the click event in act()
    await act(async () => {
      await fireEvent.click(
        screen.getByRole("button", { name: /Iniciar Sesion/i })
      );
    });

    // Mock toast.error implementation
    jest.spyOn(toast, "error").mockImplementation((msg) => {
      console.log('called too')
      return "ok";
    });

    // Assert that toast.error was called
    expect(toast.error).toHaveBeenCalledWith(
      "Usuario y/o Contraseña invalidos"
    );
  });

  test("navigates to home on successful login", async () => {
    const mockLoginResponse = {
      token: JSON.stringify({ id: "user1", name: "Test User" }),
    };

    (userRepository.login as jest.Mock).mockResolvedValue(mockLoginResponse);

    const navigate = jest.fn();

    render(
      <AuthProvider>
        <SignInPage {...{ navigate }} />
      </AuthProvider>
    );

    fireEvent.input(screen.getByLabelText(/Usuario/i), {
      target: { value: "testUser" },
    });

    fireEvent.input(screen.getByLabelText(/Contraseña/i), {
      target: { value: "testPassword" },
    });

    // Wrap the click event in act()
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesion/i }));
    });

    // Verify that navigate was called with the correct argument
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
