import { checkAuth } from "../utils";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";
import { userRouter } from "./userRouter";
import { Router } from "express";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/todo",checkAuth, todoRouter) 
appRouter.use(userRouter)