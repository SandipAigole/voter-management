const jwt = require("jsonwebtoken");
const { auth_code } = require("../config/secret.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  else if (token != auth_code) {
    return res.status(401).send({
      message: "Invalid token provided!"
    });
  }
  else {
    next();
  }
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
