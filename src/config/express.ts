import express from "express";
import cors from "cors";
import { rateLimiter } from "../middleware/rate-limiter";
import { apiKeyAuth } from "../middleware/authentication";
import ApplicationRouter from "../routers/application";
import ProductRouter from "../routers/product";
import FarmRouter from "../routers/farm";
import FarmerRouter from "../routers/farmer";

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(rateLimiter);

  app.use("/product", apiKeyAuth, ProductRouter);
  app.use("/application", apiKeyAuth, ApplicationRouter);
  app.use("/farm", apiKeyAuth, FarmRouter);
  app.use("/farmer", apiKeyAuth, FarmerRouter);

  return app;
};

export { createServer };
