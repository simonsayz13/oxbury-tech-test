import { Router } from "express";
import {
  addApplication,
  alterApplication,
  deleteApplication,
  filterApplications,
  getApplication,
  getApplicationFarmerDetails,
  getApplicationProductDetails,
} from "../controllers";

const router = Router();

router.get("/", getApplication);
router.post("/", addApplication);
router.delete("/", deleteApplication);
router.put("/", alterApplication);
router.get("/product", getApplicationProductDetails);
router.get("/farmer", getApplicationFarmerDetails);
router.get("/filter", filterApplications);

export default router;
