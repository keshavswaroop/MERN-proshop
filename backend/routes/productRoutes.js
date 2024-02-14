import express from "express";
import {
  getProducts,
  getProductsById,
} from "../controllers/productController.js";
//import products from "../data/products.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductsById);

export default router;
