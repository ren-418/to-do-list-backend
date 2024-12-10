import {
  createToDoItem,
  deleteToDoItem,
  findOneItem,
  updateItem,
  findItemsByUser,
} from "../services/to-do";

const mockRepository = {
  create: jest.fn() as any,
  save: jest.fn() as any,
  findOne: jest.fn() as any,
  find: jest.fn() as any,
};

jest.mock("../db", () => ({
  AppDataSouce: {
    getRepository: jest.fn(() => mockRepository),
  },
}));

describe("ToDo Item Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createToDoItem should create a new todo item", async () => {
    const data = {
      title: "Test Task",
      description: "Test Description",
      user_id: "123",
      priority: "high",
      due_date: new Date(),
    };

    mockRepository.create.mockReturnValue(data);
    mockRepository.save.mockResolvedValue(data);

    const result = await createToDoItem(data);

    expect(mockRepository.create).toHaveBeenCalledWith(data);
    expect(mockRepository.save).toHaveBeenCalledWith(data);
    expect(result).toEqual(data);
  });

  test("deleteToDoItem should soft delete an item", async () => {
    const data = { id: "1" };
    const existingItem = { id: "1", deletedAt: null };

    mockRepository.findOne.mockResolvedValue(existingItem);
    mockRepository.save.mockResolvedValue({
      ...existingItem,
      deletedAt: new Date(),
    });

    const result = await deleteToDoItem(data);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...existingItem,
      deletedAt: expect.any(Date),
    });
    expect(result.deletedAt).toBeTruthy();
  });

  test("findOneItem should return the item if found", async () => {
    const data = { id: "1" };
    const existingItem = { id: "1", title: "Test Task" };

    mockRepository.findOne.mockResolvedValue(existingItem);

    const result = await findOneItem(data);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(result).toEqual(existingItem);
  });

  test("updateItem should update an existing item", async () => {
    const data = { id: "1", title: "Updated Task" };
    const existingItem = { id: "1", title: "Old Task" };

    mockRepository.findOne.mockResolvedValue(existingItem);
    mockRepository.save.mockResolvedValue({
      ...existingItem,
      title: "Updated Task",
    });

    const result = await updateItem(data);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...existingItem,
      title: "Updated Task",
    });
    expect(result.title).toBe("Updated Task");
  });

  test("findItemsByUser should return items for a given user", async () => {
    const uuid = "123";
    const items = [
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ];

    mockRepository.find.mockResolvedValue(items);

    const result = await findItemsByUser(uuid);

    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { user_id: uuid },
    });
    expect(result).toEqual(items);
  });
});
