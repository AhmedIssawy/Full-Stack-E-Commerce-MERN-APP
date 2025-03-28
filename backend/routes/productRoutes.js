import { Router } from "express";
import formidable from "express-formidable";
//Middlewares
import { authinticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";
import checkId from "../middlewares/checkId.js";

//Controllers
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getPageOfProducts,
  getSpeseficProduct,
  getAllProducts,
  addProductReview,
  getTopProducts,
  getNewestProducts,
} from "../controllers/productControllers.js";

const router = Router();

router
  .route("/")
  .get(getPageOfProducts)
  .post(authinticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(getAllProducts);

router.route("/top").get(getTopProducts);
router.route("/newest").get(getNewestProducts);

router
  .route("/:id")
  .get(getSpeseficProduct)
  .patch(authinticate, authorizeAdmin, formidable(), checkId, updateProduct)
  .delete(authinticate, authorizeAdmin, deleteProduct);

router.route("/:id/reviews").post(authinticate, checkId, addProductReview);

export default router;
