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
  filterProduct,
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
  app.get("/products/filter", apiKeyAuth, filterProduct);

  app.get("/applications", apiKeyAuth, getAllApplications);
  app.get("/application", apiKeyAuth, getSelectedApplication);
  app.post("/application", apiKeyAuth, addApplication);
  app.delete("/application", apiKeyAuth, deleteApplication);
  app.put("/application", apiKeyAuth, alterApplication);
  app.get("/application/product", apiKeyAuth, getApplicationProductDetails);
  app.get("/application/farmer", apiKeyAuth, getApplicationFarmerDetails);

  app.get("/farms", apiKeyAuth, getAllFarms);
  app.get("/farm", apiKeyAuth, getSelectedFarm);
  app.post("/farm", apiKeyAuth, addFarm);
  app.delete("/farm", apiKeyAuth, deleteFarm);
  app.put("/farm", apiKeyAuth, alterFarm);

  app.get("/farmers", apiKeyAuth, getAllFarmers);
  app.get("/farmer", apiKeyAuth, getSelectedFarmer);
  app.post("/farmer", apiKeyAuth, addFarmer);
  app.delete("/farmer", apiKeyAuth, deleteFarmer);
  app.put("/farmer", apiKeyAuth, alterFarmer);
  app.get("/farmer/farm", apiKeyAuth, getFarmDetails);

  return app;
};

export { createServer };
