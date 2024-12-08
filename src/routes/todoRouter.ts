import { Router } from "express";
import { ToDoController } from "../controllers";
import { checkAuth } from "../utils";

export const todoRouter = Router();

todoRouter.post(
  "/create",
  ToDoController.createController
);

todoRouter.post(
  "/read",
  ToDoController.ReadController
);

todoRouter.post(
  "/update", 
  ToDoController.UpdateController
);

todoRouter.post(
  "/delete", 
  ToDoController.deleteController
);

