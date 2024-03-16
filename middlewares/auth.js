/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const UnauthorizedError = require("../utils/errors/unauthorizedError");

const unauthorizedError = new UnauthorizedError();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    // return next(new UnauthorizedError("Authorization required"));
    return res
      .status(unauthorizedError.statusCode)
      .send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // return next(new UnauthorizedError("Authorization required"));
    return res
      .status(unauthorizedError.statusCode)
      .send({ message: "Authorization required" });
  }
  req.user = payload;
  return next();
};
