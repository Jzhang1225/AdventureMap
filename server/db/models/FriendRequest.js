const Sequelize = require("sequelize");
const { ENUM } = Sequelize;
const db = require("../db");

const FriendRequest = db.define("friendrequest", {
  status: {
    type: ENUM(["pending", "accepted"]),
    defaultValue: "pending",
  },
});

module.exports = FriendRequest;
