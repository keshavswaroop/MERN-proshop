import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //fetching all the data from the database.

  res.json(products);
});

// @desc    Fetch a products
// @route   GET /api/products/:id
// @access  Public
const getProductsById = asyncHandler(async (req, res) => {
  // const productId = parseInt(req.params.id, 10); //convert it to int
  // const prod = products.find((p) => p._id === productId);
  const product = await Product.findById(req.params.id); //req.params.id collects the id from the url

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found"); // here the Product not Found is the error message. We are defining what error message needs to be given.
  }
});

export { getProducts, getProductsById };
