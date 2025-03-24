import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateTOken from "../utils/createToken.js";
import bcrypt from "bcryptjs";
const createUser = asyncHandler(async (req, res) => {
  // Error handling
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("Please fill all inputs");
  }
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(409).json({ message: "User already exists! try to login in." });

  //Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creating new user
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    generateTOken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Internal db error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).json({ message: "please type an email and password" }); // checked in frontend too

  const logginedUser = await User.findOne({ email });
  if (!logginedUser)
    res.status(401).json({ message: "Email doesnt exist, Try registering" });

  const comparedPassword = await bcrypt.compare(
    password,
    logginedUser.password
  );
  if (!comparedPassword)
    res.status(401).json({ message: "The password is wrong" });

  if (logginedUser.email && comparedPassword) {
    generateTOken(res, logginedUser._id);
    res.status(200).json({
      _id: logginedUser._id,
      username: logginedUser.username,
      email: logginedUser.email,
      isAdmin: logginedUser.isAdmin,
    });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const result = await User.find({}).select("-password");
  if (result) res.status(201).json({ users: result });
  res.status(401).json({ message: "Internal Error pls refresh" });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id).select("-password -__v");
  if (user) {
    res.json({
      ...user._doc,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (
    user.username === req.body.username &&
    user.email === req.body.email &&
    user.password === req.body.password
  ) {
    res
      .status(400)
      .json({ message: "Please provide new information to update!" });
  }

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({
      ...user._doc,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400).json({
        message: "Cannot delete admin by another admin! Please contact with PM",
      });
    } else {
      await User.deleteOne({ _id: user._id });
      res.json({ message: "User removed" });
    }
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id }).select("-password -__v");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "No user found!" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id }).select("-password -__v");
  if (user.username === req.body.username && user.email === req.body.email) {
    res
      .status(400)
      .json({ message: "Please provide new information to update!" });
  }

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.save();
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
