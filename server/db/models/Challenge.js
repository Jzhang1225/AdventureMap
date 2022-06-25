const { TEXT } = require("sequelize");
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
    type: STRING,
  },
  locationName: {
    type: STRING,
    defaultValue: "/images/placeholder-square.jpg",
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
  imageUrl: {
    type: STRING,
  },
  description: {
    type: TEXT,
  }
});

module.exports = Challenge;
