import { todoListService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";
const createItemHandler = async (req, res) => {
  const { title, description } = req.body;
  const item = await todoListService.createToDoItem({
    title,  
    description 
  }); 
  res.json({ item }).status(httpStatus.CREATED);
};

export const createController = errorHandlerWrapper(createItemHandler);
