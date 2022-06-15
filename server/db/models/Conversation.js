const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");

const Conversation = db.define("conversation", {
  senderId: {
    type: INTEGER,
  },
  receiverId: {
    type: INTEGER,
  },
});

module.exports = Conversation;