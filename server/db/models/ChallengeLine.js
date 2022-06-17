const Sequelize = require("sequelize");
const db = require("../db");

const ChallengeLine = db.define("challengeLine", {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = ChallengeLine;
