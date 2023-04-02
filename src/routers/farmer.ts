import { Router } from "express";
import {
  addFarmer,
  alterFarmer,
  deleteFarmer,
  filterFarmers,
  getFarmDetails,
  getFarmer,
} from "../controllers";

const router = Router();

router.get("/", getFarmer);
router.get("/farm", getFarmDetails);
router.post("/", addFarmer);
router.delete("/", deleteFarmer);
router.put("/", alterFarmer);
router.get("/filter", filterFarmers);

export default router;
