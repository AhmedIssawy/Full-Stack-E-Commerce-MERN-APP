import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import { redisClient } from "../config/redis.js";

const anHour = 60 * 60;
const aDay = 60 * 60 * 24;
const addProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.fields;
    // console.log(req.user);

    const product = new Product({
      ...data,
    });
    await product.save();
    await redisClient.del("store:products");
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Product req", req);
    // console.log(req.fields);
    await Product.findByIdAndUpdate(id, { ...req.fields }, { new: true });
    await redisClient.del("store:products");
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
    await redisClient.del("store:products");
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
    const cachedProducts = await redisClient.get("store:products");
    if (cachedProducts) {
      return res.status(200).json({ products: JSON.parse(cachedProducts) });
    }

    const products = await Product.find({})
      .populate("category")
      .sort({ createdAt: -1 });
    await redisClient.setEx("store:products", anHour, JSON.stringify(products));
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
        .json({ error: "You have already reviewed this product!" });
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
    await redisClient.del("store:products");
    res.status(201).json({ message: "Review added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const cachedProducts = await redisClient.get("topProducts");
    if (cachedProducts) {
      return res.status(200).json({ products: JSON.parse(cachedProducts) });
    }
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    await redisClient.setEx("topProducts", aDay, JSON.stringify(products));
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const getNewestProducts = asyncHandler(async (req, res) => {
  try {
    const cachedProducts = await redisClient.get("newestProducts");
    if (cachedProducts) {
      return res.status(200).json({ products: JSON.parse(cachedProducts) });
    }
    const products = await Product.find({}).sort({ _id: -1 }).limit(3);
    await redisClient.setEx("newestProducts", 60, JSON.stringify(products));
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0)
      args.category = {
        $in: checked.map((id) => new mongoose.Types.ObjectId(id)),
      };
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error while filtiring" });
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
  filterProducts,
};
