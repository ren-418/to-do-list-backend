import { body } from "express-validator";

export const createTitleValidator = () => {
  return [body("title").exists().withMessage("Title is required.")];
};
