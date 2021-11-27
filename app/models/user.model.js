const Sequelize = require('sequelize')
const { Op } = require("sequelize");
const sequelize = require('../helpers/mysql-db-util')

const UserModel = sequelize.define("user_details", {

  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  admin_id: {
    type: Sequelize.STRING
  },

  voter_id: {
    type: Sequelize.STRING,
  },

  ward_number: {
    type: Sequelize.STRING
  },

  phone_number: {
    type: Sequelize.STRING
  },

  full_name: {
    type: Sequelize.TEXT({ length: 'long' })
  },

  address: {
    type: Sequelize.TEXT({ length: 'long' })
  },

  area: {
    type: Sequelize.TEXT({ length: 'long' })
  },

  visited: {
    type: Sequelize.BOOLEAN
  },
}, {
  createdAt: false,
  updatedAt: false,
})

module.exports = UserModel;

UserModel.createUser = (userDetail) => {
  return new Promise((resolve, reject) => {
    UserModel.create(userDetail)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        return reject(err)
      });
  })
}

UserModel.updateVoterDetails = (voter_details, voter_id) => {
  return new Promise((resolve, reject) => {
    UserModel.update(voter_details, {
      where: { [Op.and]: {voter_id : voter_id} }
    })
      .then(data => resolve(data))
      .then(err => reject(err))
  })
}

UserModel.getUserList = (conditionObj, start, limit) => {
  return new Promise((resolve, reject) => {
    UserModel.findAndCountAll({
      where: { [Op.and]: conditionObj },
      offset: start,
      limit: limit
    })
    .then(data => resolve(data))
    .then(err => reject(err))
  })
}

UserModel.verifyVoterAlreadyExist = (voter_id) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ where: { [Op.and]: { voter_id: voter_id} } })
      .then(token => token !== null)
      .then(isUnique => resolve(isUnique))
      .then(err => reject(err))
  })
}
