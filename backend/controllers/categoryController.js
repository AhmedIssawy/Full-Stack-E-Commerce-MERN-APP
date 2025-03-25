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

    // Check if the new name already exists (excluding the current category)
    const existingCategory = await Category.findOne({ name });

    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    // Update the category
    const category = await Category.findByIdAndUpdate(categoryId, { name });

    

    res.json({ message: "Category updated successfully!", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: "The category got deleted successfully!" });
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
    res.status(200).json({ categories });
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
