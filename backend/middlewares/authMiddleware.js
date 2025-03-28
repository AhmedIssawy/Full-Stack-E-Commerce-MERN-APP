import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authinticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password -__v");
      next();
    } catch (error) {
      res.status(401).json({
        error: "Unauthorized, token failed! try registering or login in.",
      });
    }
  } else {
    res.status(401).json({ error: "Not authoried, Try loging in,  No token." });
  }
});

const authorizeAdmin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Not authorized as Admin." });
  }
};

export { authinticate, authorizeAdmin };
