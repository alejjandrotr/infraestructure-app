import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AuthProvider } from "../../core/Users/context/auth.context";
import { userRepository } from "../../core/Users/user.api";
import SignInPage from "./SignIn";
import toast, { Toaster } from "react-hot-toast";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock the userRepository for simulating login responses
jest.mock("../../core/Users/user.api");

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("SignInPage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <SignInPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar Sesion/i })
    ).toBeInTheDocument();
  });

  test("displays error message on invalid login", async () => {
    (userRepository.login as jest.Mock).mockImplementation(() => {
      throw new Error("Usuario y/o Contraseña invalidos");
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <SignInPage />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Usuario/i), {
      target: { value: "wrongUser" },
    });
    fireEvent.input(screen.getByLabelText(/Contraseña/i), {
      target: { value: "wrongPassword" },
    });

    // Wrap the click event in act()
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesion/i }));
    });
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
  });

  test("navigates to home on successful login", async () => {
    const mockLoginResponse = {
      token: JSON.stringify({ id: "user1", name: "Test User" }),
    };

    (userRepository.login as jest.Mock).mockResolvedValue(mockLoginResponse);

    render(
      <MemoryRouter>
        <AuthProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <SignInPage />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.input(screen.getByLabelText(/Usuario/i), {
      target: { value: "testUser" },
    });

    fireEvent.input(screen.getByLabelText(/Contraseña/i), {
      target: { value: "testPassword" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Iniciar Sesion/i }));
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
