import jwt from "jsonwebtoken";

const generateTOken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // Setting JWT as HTTP-ONLY "security porpouse"
  res.cookie("jwt", token, {
    httpOnly: true, //js wont access the cookie prevents XSS attacks
    secure: process.env.NODE_ENV !== "development", //HTTPS ONLY
    sameSite: "strict", //Prevents CSRF
    maxAge: 30 * 24 * 60 * 1000,
  });
  return token;
};

export default generateTOken;
