const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "points", "avatar"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "username", "points", "avatar"],
      where: {
        id: req.params.id
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

