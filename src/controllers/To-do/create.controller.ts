import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const createItemHandler = async (req, res) => {
  const { title, description } = req.body;
  
//   const user = await userService.createUser({
//     username,
//     email,
//     password: hashPassword,
//   });
//   res.json({ user }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(createItemHandler);
