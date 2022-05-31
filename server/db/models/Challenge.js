const Sequelize = require('sequelize')
const db = require('../db')

const Challenge = db.define('challenge', {
  name: {
    type: Sequelize.STRING
  },
  points: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = Challenge