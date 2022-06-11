const db = require("./db");

const User = require("./models/User");
const Challenge = require("./models/Challenge");
const FriendRequest = require("./models/FriendRequest");
const ChallengeLine = require("./models/ChallengeLine");


User.hasMany(ChallengeLine);
Challenge.hasMany(ChallengeLine);
User.hasMany(FriendRequest);
FriendRequest.belongsTo(User, { as: "friend" });

module.exports = {
  db,
  models: {
    User,
    Challenge,
    FriendRequest,
    ChallengeLine
  },
};
