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
  streetAddress: {
    type: STRING
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  zipCode: {
    type: INTEGER
  },
  startDate: {
    type: DATE,
    //allowNull: false,
    //set boundary date needing to be in the future
  },
  endDate: {
    type: DATE,
    //allowNull: false,
  },
  difficulty: {
    type: INTEGER,
    //allowNull: false,
  },
});

module.exports = Challenge;
