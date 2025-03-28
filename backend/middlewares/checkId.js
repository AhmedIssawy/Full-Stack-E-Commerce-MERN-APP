import { isValidObjectId } from "mongoose";

const checkId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  } else {
    next();
  }
};

export default checkId;
