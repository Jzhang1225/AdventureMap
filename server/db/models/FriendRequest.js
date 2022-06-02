const Sequelize = require("sequelize");
const { ENUM } = Sequelize;
const db = require("../db");

const FriendRequest = db.define("friendrequest", {
  status: {
    type: ENUM(["pending", "accepted"]),
    defaultValue: "pending",
  },
});

/* a friendrequest looks like this: { 
  id: some number,
  status: 'pending',
  userId: Some user's id who sent friend request,
  friendId: Some user's id who was sent the friend request
}
*/

module.exports = FriendRequest;
