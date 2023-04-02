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
import { apiKeyAuth } from "../middleware/authentication";

const router = Router();

router.get("/", apiKeyAuth, getApplication);
router.post("/", apiKeyAuth, addApplication);
router.delete("/", apiKeyAuth, deleteApplication);
router.put("/", apiKeyAuth, alterApplication);
router.get("/product", apiKeyAuth, getApplicationProductDetails);
router.get("/farmer", apiKeyAuth, getApplicationFarmerDetails);
router.get("/filter", apiKeyAuth, filterApplications);

export default router;
