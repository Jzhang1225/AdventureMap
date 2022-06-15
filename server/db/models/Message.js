const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");

const Message = db.define("message", {
  sender: {
    type: INTEGER,
  },
  text: {
    type: STRING,
  }
});

module.exports = Message;