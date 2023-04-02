import express from "express";
import cors from "cors";
import {
  addFarm,
  addFarmer,
  alterFarm,
  alterFarmer,
  deleteFarm,
  deleteFarmer,
  filterFarmers,
  filterFarms,
  getAllFarmers,
  getAllFarms,
  getFarmDetails,
  getSelectedFarm,
  getSelectedFarmer,
} from "../controllers";
import { rateLimiter } from "../middleware/rate-limiter";
import { apiKeyAuth } from "../middleware/authentication";
import ApplicationRouter from "../routers/application";
import ProductRouter from "../routers/product";

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(rateLimiter);

  app.use("/product", apiKeyAuth, ProductRouter);
  app.use("/application", apiKeyAuth, ApplicationRouter);

  app.get("/farms", apiKeyAuth, getAllFarms);
  app.get("/farm", apiKeyAuth, getSelectedFarm);
  app.post("/farm", apiKeyAuth, addFarm);
  app.delete("/farm", apiKeyAuth, deleteFarm);
  app.put("/farm", apiKeyAuth, alterFarm);
  app.get("/farm/filter", apiKeyAuth, filterFarms);

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
