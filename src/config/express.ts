import express from "express";
import cors from "cors";
import { routeController } from "../controllers/test-controller";
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
  getAllApplications,
  getAllFarmers,
  getAllFarms,
  getAllProducts,
  getSelectedApplication,
  getSelectedFarm,
  getSelectedFarmer,
  getSelectedProduct,
} from "../controllers";

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.get("/api", routeController);

  app.get("/products", getAllProducts);
  app.get("/product", getSelectedProduct);
  app.post("/product", addProduct);
  app.delete("/product", deleteProduct);
  app.put("/product", alterProduct);

  app.get("/applications", getAllApplications);
  app.get("/application", getSelectedApplication);
  app.post("/application", addApplication);
  app.delete("/application", deleteApplication);
  app.put("/application", alterApplication);

  app.get("/farms", getAllFarms);
  app.get("/farm", getSelectedFarm);
  app.post("/farm", addFarm);
  app.delete("/farm", deleteFarm);
  app.put("/farm", alterFarm);

  app.get("/farmers", getAllFarmers);
  app.get("/farmer", getSelectedFarmer);
  app.post("/farmer", addFarmer);
  app.delete("/farmer", deleteFarmer);
  app.put("/farmer", alterFarmer);

  return app;
};

export { createServer };
