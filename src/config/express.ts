import express from "express";
import cors from "cors";
import { routeController } from "../controllers/controller";

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  // app.use(express.json());
  app.use(cors());
  app.use("/api", routeController);
  return app;
};

export { createServer };
