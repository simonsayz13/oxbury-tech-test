import { Router } from "express";
import {
  addProduct,
  alterProduct,
  deleteProduct,
  filterProducts,
  getProduct,
} from "../controllers";

const router = Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/", deleteProduct);
router.put("/", alterProduct);
router.get("/filter", filterProducts);

export default router;
