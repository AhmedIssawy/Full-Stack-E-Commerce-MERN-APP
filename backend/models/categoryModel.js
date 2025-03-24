import mongoose from "mongoose";

/**
 * @typedef {Object} Category
 * @property {string} name - The name of the category.
 * @property {Date} createdAt - The creation date of the category.
 */

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 42,
      unique: true,
    },
  },
  { timestamps: true }
);

/** @type {import("mongoose").Model<Category>} */
const Category = mongoose.model("Category", categorySchema);

export default Category;
