import { ToDoItemEntity } from "../entities";
import { AppDataSouce } from "../db";

export const createToDoItem = async (data) => {
  const { title, description } = data;
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const todoItem = todoRepository.create({
    title: title,
    description: description,
    due_date: null,
  });
  await todoRepository.save(todoItem);
  return todoItem;
};

export const deleteToDoItem = async (data) => {
  const { id } = data;
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const existingItem = await todoRepository.findOne({
    where: { id },
  });
  if (!existingItem) {
    return null
  }
  await todoRepository.softDelete(existingItem); 
  return existingItem;
};

export const findOneItem = async (data) => {
  const { id } = data;
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const result = await todoRepository.findOne({
    where: { id },
  });
  return result;
};

export const updateItem = async (data) => {
  const { id } = data;
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const existingItem = await todoRepository.findOne({
    where: { id },
  });
  if (!existingItem) {
    return null;
  }
  Object.assign(existingItem, data);
  const updatedItem = await todoRepository.save(existingItem);
  return updatedItem;
};
