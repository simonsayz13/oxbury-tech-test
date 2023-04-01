import express from "express";
import cors from "cors";
import { routeController } from "../controllers/test-controller";
import {
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

  app.get("/applications", getAllApplications);
  app.get("/application", getSelectedApplication);

  app.get("/farms", getAllFarms);
  app.get("/farm", getSelectedFarm);

  app.get("/farmers", getAllFarmers);
  app.get("/farmer", getSelectedFarmer);

  return app;
};

export { createServer };
