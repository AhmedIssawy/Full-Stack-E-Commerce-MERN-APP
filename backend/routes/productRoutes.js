import { Router } from "express";
import formidable from "express-formidable";
//Middlewares
import { authinticate, authorizeAdmin } from "../middlewares/authMiddleWare.js";
import checkId from "../middlewares/checkId.js";

//Controllers
import { addProduct } from "../controllers/productControllers.js";

const router = Router();

router.route("/").post(authinticate, authorizeAdmin, formidable(), addProduct);

export default router;
