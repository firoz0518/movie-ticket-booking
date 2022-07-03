const jwt = require("jsonwebtoken");
const config = require("../config/config");

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  return payload;
};

/**
 * @param {string} token
 */
const decodeToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  return payload;
};
module.exports = { verifyToken, decodeToken };
