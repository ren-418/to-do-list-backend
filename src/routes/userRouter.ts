import { Router } from "express";
import { getUserData } from "../controllers/User";
import { checkAuth } from "../utils";
export const userRouter = Router();

// handle route to get user's data(tasks)
userRouter.post(
    "/user/getData",
    checkAuth,
    getUserData
)
  