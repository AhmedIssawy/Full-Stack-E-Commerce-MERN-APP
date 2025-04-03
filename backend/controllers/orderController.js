import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
// Utility function
import { calcPrices } from "../utils/calcPrices.js";

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "No order items" });
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = [];
    for (const item of orderItems) {
      const product = itemsFromDB.find(
        (p) => p._id.toString() === item._id.toString()
      );
      if (!product) {
        return res.status(404).json({
          error: `One or more product are not found, Product id contact support ${item._id}`,
        });
      }

      dbOrderItems.push({
        ...item,
        name: product.name,
        image: product.image,
        product: product._id,
        price: product.price,
      });
    }

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ createdOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ _id: -1 });
    if (!orders) {
      res.status(404).json({ error: "No orders yet" });
    } else {
      res.json(orders);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const customerOrders = await Order.find({ user: _id });
    res.status(200).json(customerOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const countTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const calculateTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(404).json({ error: "Order not found" });
  }
});

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.json({ error: "Order not found" });
    } else {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  countTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};
