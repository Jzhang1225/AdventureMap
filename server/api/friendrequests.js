const router = require("express").Router();
const {
  models: { FriendRequest, User },
} = require("../db");
module.exports = router;

const Op = require("sequelize").Op;

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
    const friendsRequests = await FriendRequest.findAll({
      where: {
        [Op.or]: [{ userId: req.user.id }, { friendId: req.user.id }],
      },
    });
    res.json(friendsRequests);
  } catch (err) {
    next(err);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const friendsRequest = await FriendRequest.create({
      userId: req.user.id,
      friendId: req.body.id,
    });
    res.json(friendsRequest);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const friendRequest = await FriendRequest.findByPk(req.params.id);
    await friendRequest.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const friendRequest = await FriendRequest.findByPk(req.params.id);
    await friendRequest.update({ status: "accepted" });
    res.json(friendRequest);
  } catch (err) {
    next(err);
  }
});
