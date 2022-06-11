const Sequelize = require("sequelize");
const { STRING, INTEGER, DATE } = Sequelize;
const db = require("../db");

const Challenge = db.define("challenge", {
  name: {
    type: STRING,
  },
  points: {
    type: INTEGER,
  },
  creator: {
    type: INTEGER,
  },
  address: {
    type: STRING,
    allowNull: false,
  },
  startDate: {
    type: DATE,
    allowNull: false,
  },
  endDate: {
    type: DATE,
    allowNull: false,
  },
  difficulty: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = Challenge;
