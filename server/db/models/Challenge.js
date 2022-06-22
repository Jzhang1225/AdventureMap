const Sequelize = require("sequelize");
const { STRING, INTEGER, DATE, ENUM } = Sequelize;
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
    type: STRING,
  },
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  zip: {
    type: INTEGER,
  },
  startDate: {
    type: DATE,
  },
  endDate: {
    type: DATE,
  },
  difficulty: {
    type: ENUM("Easy", "Medium", "Hard"),
  },
});

module.exports = Challenge;
