const router = require("express").Router();
const {
  models: { ChallengeLine, User },
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

router.get("/", isLoggedIn, async(req, res, next) => {
    try{
        const challengeLines = await ChallengeLine.findAll()
        res.json(challengeLines);
    } catch(e){
        next(e);
    }   
})
