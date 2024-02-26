import express from "express";
import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "../controllers/productController.js";
//import products from "../data/products.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProducts);
router
  .route("/:id")
  .get(getProductsById)
  .put(protect, admin, updateProducts)
  .delete(protect, admin, deleteProducts);

export default router;
