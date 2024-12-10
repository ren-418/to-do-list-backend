import { userService } from "../../services";

import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userService.getOneUser({ email });
  // In case not found user
  if (!findUser) res.json({ msg:"User does not exsit" }).status(httpStatus[404]);
  // In case deleted user
  if (findUser.deletedAt) res.json({ msg:"User does not exsit" }).status(httpStatus[404]);
  const compare = await comparePassword(password, findUser.password);
  // In case incorrect password
  if (!compare) res.json({ msg:"Incorrect password" }).status(httpStatus[400]);
  const token = generateToken(findUser.uuid);
  res.json({ token }).status(httpStatus.ACCEPTED); 
};

export const loginController = errorHandlerWrapper(loginHandler);


