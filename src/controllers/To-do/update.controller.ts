import { todoListService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const updateOneItemHandler = async (req,res) => {
    const updateData = req.body;
    const updatedItem = await todoListService.updateItem(updateData);
    res.json({ updatedItem }).status(httpStatus.OK);
}

export const UpdateController = errorHandlerWrapper(updateOneItemHandler);


