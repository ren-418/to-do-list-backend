import { userService } from "../../services";

import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userService.getOneUser({ email });
  if (!findUser) return null;
  if (findUser.deletedAt) return null;
  const compare = await comparePassword(password, findUser.password);
  if (!compare) return null;
  const token = generateToken(findUser.uuid);
  res.json({ token }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);


