import { Router } from "express";
import { getUserData } from "../controllers/User";
import { checkAuth } from "../utils";
export const userRouter = Router();

userRouter.post(
    "/user/getData",
    checkAuth,
    getUserData
)
  