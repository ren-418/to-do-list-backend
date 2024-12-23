import httpStatus from "http-status";
import { todoListService } from "../../services";

export const getUserData = async (req,res) => {
    const user = req.user
    
    const userTasks = await todoListService.findItemsByUser(user.uuid);
    // get user's tasks and make userData with profile data
    const userData = {
        email:user.email,
        username:user.username,
        taskList:userTasks
    }
    res.json(userData).status(httpStatus.OK)
  }