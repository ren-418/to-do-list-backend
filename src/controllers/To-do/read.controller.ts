import { todoListService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const getOneItemHandler = async (req,res) => {
    const data = req.body;
    const foundItem = await todoListService.findOneItem(data);
    res.json({ foundItem }).status(httpStatus.OK);
}

export const ReadController = errorHandlerWrapper(getOneItemHandler);