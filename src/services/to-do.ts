import { ToDoItemEntity } from "../entities";
import { AppDataSouce } from "../db";

export const createToDoItem = async (data) => {
  const { title, description,user_id } = data;
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const todoItem = todoRepository.create({
    user_id:user_id,
    title: title,
    description: description,
    due_date: null,
  });
  await todoRepository.save(todoItem);
  return todoItem;
};

export const deleteToDoItem = async (data) => {
  const { id } = data;
  if (!id) {
    return null;
  }
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const deletedItem = await softDelete(todoRepository, id);
  return deletedItem;
};

export const findOneItem = async (data) => {
  const { id } = data;
  if (!id) {
    return null;
  }
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const result = await todoRepository.findOne({
    where: { id },
  });

  return result;
};

export const updateItem = async (data) => {
  const { id } = data;
  if (!id) {
    return null;
  }
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  const existingItem = await todoRepository.findOne({
    where: { id },
  });
  if (!existingItem) {
    return null;
  }
  if (!!data.status) {
    data.due_date = new Date();
  } else {
    data.due_date = null;
  }
  Object.assign(existingItem, data);
  const updatedItem = await todoRepository.save(existingItem);
  return updatedItem;
};

const softDelete = async (todoRepository, id) => {
  if (!id) {
    return null;
  }
  const existingItem = await todoRepository.findOne({
    where: { id },
  });
  if (!existingItem) {
    return null;
  }
  existingItem.deletedAt = new Date();
  await todoRepository.save(existingItem);
  return existingItem;
};
