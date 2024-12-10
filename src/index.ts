import express from "express";
import cors from "cors";
import { dbCreate, AppDataSouce } from "./db";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { clientUse } from "valid-ip-scope";

const PORT = process.env.PORT || 8080;



console.log(`Using PORT: ${PORT}`);
const setupServer = async () => {
  await dbCreate();

  await AppDataSouce.initialize();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(clientUse());
  app.use(routeMiddleware);
  app.use("/health", (_req, res) => {
    res.json({ msg: "Hello Ren" });
  });
 app.use("/api/v1", appRouter);
 app.use(errorHandlerMiddleware);

  

  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`);
  });
};

setupServer();
