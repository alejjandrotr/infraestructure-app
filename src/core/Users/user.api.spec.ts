import { userRepository } from "./user.api"; // Adjust path as necessary
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { mockUser } from "../mockData/data-users";
import { LoginDto } from "./user";
import { NotFoundUserError } from "./errors/user-not-found.error"
import { UserWrongPasswordError } from "./errors/user-wrong-password.error"

describe("UserApi", () => {
  beforeEach(() => {});

  test("should have correct configuration", () => {
    expect(userRepository.getConfigPath()).toBe(ENTITIES_KEYS.USERS);
  });

  test("should be of type MOCK", () => {
    expect(userRepository.getConfigRepositoryType()).toBe(RepositoryType.MOCK);
  });

  test("should add a new user", async () => {
    const newUser = mockUser(1, "123456");
    const mockAdd = jest
      .spyOn(userRepository.repository, "add")
      .mockResolvedValue({ id: "1", ...newUser });

    const result = await userRepository.add(newUser);

    expect(mockAdd).toHaveBeenCalledWith(newUser, undefined);
    expect(result).toEqual({ id: "1", ...newUser });
  });

  test("should delete a user by ID", async () => {
    const mockDelete = jest
      .spyOn(userRepository.repository, "delete")
      .mockResolvedValue([]);

    const result = await userRepository.delete("1");

    expect(mockDelete).toHaveBeenCalledWith("1", undefined);
    expect(result).toEqual([]);
  });

  test("should edit a user by ID", async () => {
    const updatedUser = {
      id: "1",
      ...mockUser(1, "123456"),
      name: "Upadted",
    };

    const mockEdit = jest
      .spyOn(userRepository.repository, "edit")
      .mockResolvedValue(updatedUser);

    const result = await userRepository.edit("1", updatedUser);

    expect(mockEdit).toHaveBeenCalledWith("1", updatedUser, undefined);
    expect(result).toEqual(updatedUser);
  });

  test("User can login", async () => {
    const loginDto: LoginDto = {
      usuario: "admin",
      contraseña: "12345678",
    };

    const ourUser = {
      ...mockUser(1, "123456"),
      usuario: "admin",
      contraseña: "12345678",
    };

    const mockGet = jest
      .spyOn(userRepository.repository, "get")
      .mockResolvedValue([
        mockUser(1, "123456"),
        mockUser(2, "123456"),
        mockUser(3, "123456"),
        ourUser,
        mockUser(4, "123456"),
        mockUser(5, "123456"),
      ]);

    const result = await userRepository.login(loginDto);

    expect(mockGet).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toEqual({ token: JSON.stringify(ourUser) });
  });

  test("User cannot  login with a user that not exit", async () => {
    const loginDto: LoginDto = {
      usuario: "Admin",
      contraseña: "12345678",
    };

    const ourUser = {
      ...mockUser(1, "123456"),
      usuario: "admin",
      contraseña: "12345678",
    };

    const mockGet = jest
      .spyOn(userRepository.repository, "get")
      .mockResolvedValue([
        mockUser(1, "123456"),
        mockUser(2, "123456"),
        mockUser(3, "123456"),
        ourUser,
        mockUser(4, "123456"),
        mockUser(5, "123456"),
      ]);

    await expect(userRepository.login(loginDto)).rejects.toThrow(new NotFoundUserError());
    expect(mockGet).toHaveBeenCalled();
  });

  test("User cannot  login with a wrong user password", async () => {
    const loginDto: LoginDto = {
      usuario: "admin",
      contraseña: "123456",
    };

    const ourUser = {
      ...mockUser(1, "123456"),
      usuario: "admin",
      contraseña: "12345678",
    };

    const mockGet = jest
      .spyOn(userRepository.repository, "get")
      .mockResolvedValue([
        mockUser(1, "123456"),
        mockUser(2, "123456"),
        mockUser(3, "123456"),
        ourUser,
        mockUser(4, "123456"),
        mockUser(5, "123456"),
      ]);

    await expect(userRepository.login(loginDto)).rejects.toThrow(new UserWrongPasswordError());
    expect(mockGet).toHaveBeenCalled();
  });
});
