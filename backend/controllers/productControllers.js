import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModal.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.fields;

    const product = new Product({
      ...data,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    // console.log("Product req", req);
    // console.log(req.fields);
    await Product.findByIdAndUpdate(id, { ...req.fields }, { new: true });
    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const getPageOfProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.status(200).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page < Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getSpeseficProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found!" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // product id
    const { rating, comment } = req.body;
    const product = await Product.findById(id);

    if (
      product.reviews.find((r) => r.user.toString() === req.user._id.toString())
    ) {
      res
        .status(400)
        .json({ message: "You have already reviewed this product!" });
      return;
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getNewestProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(3);
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getPageOfProducts,
  getSpeseficProduct,
  getAllProducts,
  addProductReview,
  getTopProducts,
  getNewestProducts,
};
