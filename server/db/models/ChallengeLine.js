const Sequelize = require("sequelize");
const db = require("../db");

const ChallengeLine = db.define("challengeLine", {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

ChallengeLine.createRandom = async (User, Challenge) => {
  const users = await User.findAll();
  const challenges = await Challenge.findAll();
  await ChallengeLine.create({
    userId: users[Math.floor(Math.random() * users.length)].id,
    challengeId: challenges[Math.floor(Math.random() * challenges.length)].id,
  });
};

module.exports = ChallengeLine;
