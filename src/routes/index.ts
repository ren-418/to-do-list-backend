import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";
import { Router } from "express";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/todo", todoRouter) 