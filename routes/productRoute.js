import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:sellerId", getProductById);
router.post("/createProduct", createProduct);

export default router;
