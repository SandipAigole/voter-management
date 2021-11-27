const Sequelize = require('sequelize')
const { Op } = require("sequelize");
const sequelize = require('../helpers/mysql-db-util')

const AdminModel = sequelize.define("admin_details", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: Sequelize.STRING
  },

  phone_number: {
    type: Sequelize.STRING
  },

  password: {
    type: Sequelize.STRING
  },

  image_url: {
    type: Sequelize.TEXT({ length: 'long' })
  },

  ward_number: {
    type: Sequelize.STRING
  },

  login_status: {
    type: Sequelize.STRING
  },
}, {
  createdAt: false,
  updatedAt: false,
})

module.exports = AdminModel;

AdminModel.createAdmin = (adminDetail) => {
  return new Promise((resolve, reject) => {
    AdminModel.create(adminDetail)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        return reject(err)
      });
  })
}

AdminModel.getAllProductsWithLimit = (start, limit) => {
  return new Promise((resolve, reject) => {
      AdminModel.findAndCountAll({
        // order: [['id', 'ASC']],
        offset: start,
        limit: limit
     })
     .then(result => {
       resolve(result)
     }).catch(err => {
       return reject(err)
     })
  })
}
