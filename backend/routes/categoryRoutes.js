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

router.route("/").post(authinticate, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .get(authinticate, getOneCategory)
  .put(authinticate, authorizeAdmin, updateCategory)
  .delete(authinticate, authorizeAdmin, deleteCategory);
router.route("/categories").get(authinticate, getAllCategories);
export default router;
