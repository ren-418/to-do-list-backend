import { ToDoItemEntity } from "../entities";
import { AppDataSouce } from "../db";

export const createToDoItem = async (data) => {
  const { title, description, user_id, priority, due_date } = data;
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);

  //create new todoitem
  const todoItem = todoRepository.create({
    user_id: user_id,
    title: title,
    description: description,
    due_date: due_date,
    priority: priority,
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
  // handle delete as softDelete
  const deletedItem = await softDelete(todoRepository, id);
  return deletedItem;
};

export const findOneItem = async (data) => {
  const { id } = data;
  if (!id) {
    return null;
  }
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  // find item by id
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

  // find existing item by id
  const existingItem = await todoRepository.findOne({
    where: { id },
  });
  if (!existingItem) {
    return null;
  }
// update and save item with new data
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
  
  // mark item as deleted with inserting value into deletedAt property
  existingItem.deletedAt = new Date();
  await todoRepository.save(existingItem);
  return existingItem;
};

export const findItemsByUser = async (uuid) => {
  const user_id = uuid;
  if (!user_id) {
    return null;
  }
  const todoRepository = AppDataSouce.getRepository(ToDoItemEntity);
  // find all items that was created by user id
  const result = await todoRepository.find({
    where: { user_id },
  });
  return result;
};
