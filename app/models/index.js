const Admin = require("./admin.model")
const User = require("./user.model");

const db = {
  Admin: Admin,
  User: User,
}

module.exports = db;
