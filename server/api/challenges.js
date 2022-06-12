const router = require("express").Router();
const {
  models: { Challenge, User },
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
        const challenges = await Challenge.findAll()
        res.json(challenges);
    } catch(e){
        next(e);
    }   
})

router.get("/:id", isLoggedIn, async(req, res, next) => {
    try{
        const challenge = await (Challenge.findById(req.params.id*1))
        res.json(challenge);
    }
    catch(e){
        next(e);
    }
})
