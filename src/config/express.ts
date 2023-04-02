import express from "express";
import cors from "cors";
import {
  addFarmer,
  alterFarmer,
  deleteFarmer,
  filterFarmers,
  getAllFarmers,
  getFarmDetails,
  getSelectedFarmer,
} from "../controllers";
import { rateLimiter } from "../middleware/rate-limiter";
import { apiKeyAuth } from "../middleware/authentication";
import ApplicationRouter from "../routers/application";
import ProductRouter from "../routers/product";
import FarmRouter from "../routers/farm";

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(rateLimiter);

  app.use("/product", apiKeyAuth, ProductRouter);
  app.use("/application", apiKeyAuth, ApplicationRouter);
  app.use("/farm", apiKeyAuth, FarmRouter);

  app.get("/farmers", apiKeyAuth, getAllFarmers);
  app.get("/farmer", apiKeyAuth, getSelectedFarmer);
  app.post("/farmer", apiKeyAuth, addFarmer);
  app.delete("/farmer", apiKeyAuth, deleteFarmer);
  app.put("/farmer", apiKeyAuth, alterFarmer);
  app.get("/farmer/farm", apiKeyAuth, getFarmDetails);
  app.get("/farmer/filter", apiKeyAuth, filterFarmers);

  return app;
};

export { createServer };
