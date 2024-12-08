import { todoListService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const deleteItemHandler = async (req,res) => {
    const { id} = req.body;
    const deletedItem = await todoListService.deleteToDoItem(id) ;
    res.json({ deletedItem }).status(httpStatus.OK);
}

export const deleteController = errorHandlerWrapper(deleteItemHandler);