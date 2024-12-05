import { userRepository } from "./user.api"; // Adjust path as necessary
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { mockUser } from "../mockData/data-users";

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
    const updatedUser =  {
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
});
