const Sequelize = require('sequelize');
const { INTEGER } = Sequelize;
const db = require("../db");

const ChallengeLine = db.define("challengeLine", {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
})

module.exports = ChallengeLine;