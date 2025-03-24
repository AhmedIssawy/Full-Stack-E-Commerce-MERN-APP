import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const existedCategory = await Category.findOne({ name });
    if (existedCategory) {
      return res.status(409).json({ error: "Already existed category name!" });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Created the category seccessfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(categoryId, { name });
    if (!category) {
      return res.status(404).json({ error: "Category is not found" });
    }
    res.json({ message: "Category got updated!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete({ _id: categoryId });
    if (category) {
      res.status(204);
    } else {
      res.status(404).json({ error: "Category is not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).select("-__v");
    if (!categories) {
      res.status(404).json({ error: "No categories yet." });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error. please contact the support" });
  }
});

const getOneCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).select("-__v");
    if (!category) {
      res.status(404).json({ error: "Not found" });
    }
    res.status(200).json(category);
    0;
  } catch (error) {
    console.error(error);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
};
