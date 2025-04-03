import { Router } from "express";
import { authinticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  countTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";
const router = Router();

router
  .route("/")
  .post(authinticate, createOrder)
  .get(authinticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authinticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(countTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authinticate, findOrderById);
router.route("/:id/pay").patch(authinticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .patch(authinticate, authorizeAdmin, markOrderAsDelivered);
export default router;
