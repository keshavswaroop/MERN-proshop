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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/admin
const createProducts = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProducts = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create a new review
// @route   PUT /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: rating,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(200).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  createProductReview,
};
