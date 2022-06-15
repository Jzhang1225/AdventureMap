const db = require("./db");

const User = require("./models/User");
const Challenge = require("./models/Challenge");
const FriendRequest = require("./models/FriendRequest");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const ChallengeLine = require("./models/ChallengeLine");

User.hasMany(ChallengeLine);
ChallengeLine.belongsTo(User);
Challenge.hasMany(ChallengeLine);
ChallengeLine.belongsTo(Challenge);
User.hasMany(FriendRequest);
FriendRequest.belongsTo(User, { as: "friend" });
Message.belongsTo(Conversation);

module.exports = {
  db,
  models: {
    User,
    Challenge,
    FriendRequest,
    Conversation,
    Message,
    ChallengeLine,
  },
};
