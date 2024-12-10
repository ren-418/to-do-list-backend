import { NextFunction } from "express";
import { Env } from "../env";
import jwt from "jsonwebtoken";
import { PayloadType } from "../types";
import { userService } from "../services";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const checkAuth = async (req, _res, next: NextFunction) => {
  try {
    
    const token = req.header("Authorization").replace("Bearer ", "");
    const { secretKey } = Env;
    
    // check user loggedin or not by jwt
    const { uuid } = jwt.verify(token, secretKey) as PayloadType;
    
    if (!uuid) {
      next(new UnauthorizedError("Token is invalid"));
    }
    const user = await userService.getOneUser({ uuid });
    req.user = { ...user };
    next();
  } catch {
    next(new UnauthorizedError("Token is invalid"));
  }
};
