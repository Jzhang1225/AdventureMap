const Sequelize = require('sequelize');
const { INTEGER } = Sequelize;
const db = require("../db");

const ChallengeLine = db.define("challengeLine", {})

module.exports = ChallengeLine;