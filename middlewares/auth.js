const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  JWT_SECRET = "3282618331b19a45e1df5543cbb45e12597cb9819aaed47a7d715690434f16ef",
} = process.env;

const UnauthorizedError = require("../utils/errors/unauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }
  req.user = payload;
  return next();
};
