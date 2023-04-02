import express from "express";
import cors from "cors";
import {
  addApplication,
  addFarm,
  addFarmer,
  addProduct,
  alterApplication,
  alterFarm,
  alterFarmer,
  alterProduct,
  deleteApplication,
  deleteFarm,
  deleteFarmer,
  deleteProduct,
  filterApplications,
  filterFarmers,
  filterFarms,
  filterProducts,
  getAllApplications,
  getAllFarmers,
  getAllFarms,
  getAllProducts,
  getApplicationFarmerDetails,
  getApplicationProductDetails,
  getFarmDetails,
  getSelectedApplication,
  getSelectedFarm,
  getSelectedFarmer,
  getSelectedProduct,
} from "../controllers";
import { rateLimiter } from "../middleware/rate-limiter";
import { apiKeyAuth } from "../middleware/authentication";
import ApplicationRouter from "../routers/application";
const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(rateLimiter);

  app.get("/products", apiKeyAuth, getAllProducts);
  app.get("/product", apiKeyAuth, getSelectedProduct);
  app.post("/product", apiKeyAuth, addProduct);
  app.delete("/product", apiKeyAuth, deleteProduct);
  app.put("/product", apiKeyAuth, alterProduct);
  app.get("/product/filter", apiKeyAuth, filterProducts);

  app.use("/application", ApplicationRouter);

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
