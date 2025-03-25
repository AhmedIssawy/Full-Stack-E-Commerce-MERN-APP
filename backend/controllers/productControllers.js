import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModal.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.fields;

    const product = new Product({
      ...data,
    });

    await product.save();
    res.status(201).json({message: "Product added successfully!"});
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

export { addProduct };
