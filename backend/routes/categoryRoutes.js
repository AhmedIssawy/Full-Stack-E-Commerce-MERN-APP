import { Router } from "express";
//middlewares
import { authinticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";

//Controllers
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
} from "../controllers/categoryController.js";

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(authinticate, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .get(getOneCategory)
  .put(authinticate, authorizeAdmin, updateCategory)
  .delete(authinticate, authorizeAdmin, deleteCategory);

export default router;
