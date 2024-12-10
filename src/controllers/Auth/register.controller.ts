import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const findUser = await userService.getOneUser({ email });
  // In case user already exsit
  if (!!findUser) 
    res.json({ msg:"Already existing user" }).status(httpStatus[203]);
  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });
  res.json({ user }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(registerHandler);
