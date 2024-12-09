import { todoListService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const createItemHandler = async (req, res) => {
  const data = req.body;
  if (!!req.user) {
    data.user_id = req.user.uuid
  }
  const item = await todoListService.createToDoItem(data); 
  res.json({ item }).status(httpStatus.CREATED);
}; 

export const createController = errorHandlerWrapper(createItemHandler);
