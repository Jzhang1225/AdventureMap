const Sequelize = require("sequelize");
const { ENUM } = Sequelize;
const db = require("../db");

const FriendRequest = db.define("friendrequest", {
  status: {
    type: ENUM(["pending", "accepted"]),
    defaultValue: "pending",
  },
});

FriendRequest.createRandom = async (User) => {
  const users = await User.findAll();
  const randomNum = Math.random();
  await FriendRequest.create({
    userId: Math.ceil(Math.random() * users.length),
    friendId: Math.ceil(Math.random() * users.length),
    status: randomNum < 0.3 ? "accepted" : "pending",
  });
};

FriendRequest.beforeCreate(async (friendrequest, options) => {
  const friendRequests = await FriendRequest.findAll();
  friendRequests.forEach((request) => {
    if (
      (request.friendId === friendrequest.friendId &&
        request.userId === friendrequest.userId) ||
      (request.userId === friendrequest.friendId &&
        request.friendId === friendrequest.userId)
    ) {
      friendrequest.destroy();
    }
  });
});

module.exports = FriendRequest;
