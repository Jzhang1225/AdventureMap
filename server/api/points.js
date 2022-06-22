const router = require("express").Router();
const {
  models: {  User },
} = require("../db");
module.exports = router;

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

router.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    let existingPoints = user.points;
    console.log(existingPoints);
    console.log('sent points', req.body)
    await user.update({points: existingPoints + req.body.points*1})
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

