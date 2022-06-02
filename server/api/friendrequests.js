const router = require("express").Router();
const {
  models: { FriendRequest, User },
} = require("../db");
module.exports = router;

const Op = require("Sequelize").Op;

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    if (req.user) {
      next();
    } else throw new Error();
  } catch (err) {
    next(err);
  }
};

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const friendsList = await FriendRequest.findAll({
      where: {
        [Op.or]: [{ userId: req.user.id }, { friendId: req.user.id }],
      },
    });
    res.json(friendsList);
  } catch (err) {
    next(err);
  }
});
