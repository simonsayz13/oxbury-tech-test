import { Router } from "express";
import {
  addFarm,
  alterFarm,
  deleteFarm,
  filterFarms,
  getFarm,
} from "../controllers";

const router = Router();

router.get("/", getFarm);
router.post("/", addFarm);
router.delete("/", deleteFarm);
router.put("/", alterFarm);
router.get("/filter", filterFarms);

export default router;
