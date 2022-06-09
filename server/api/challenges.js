const router = require("express").Router();
const {
  models: { Challenge, User },
} = require("../db");
module.exports = router;

// const Op = require("sequelize").Op;

// const isLoggedIn = async (req, res, next) => {
//   try {
//     req.user = await User.findByToken(req.headers.authorization);
//     if (req.user) {
//       next();
//     } else throw new Error();
//   } catch (err) {
//     next(err);
//   }
// };

// router.get("/", isLoggedIn, async(req, res, next) => {
//     try{
//         res.json(await Challenge.findAll());
//     } catch(e){
//         next(e);
//     }   
// })

router.get("/", async(req, res, next) => {
    try{
        const challenges = await Challenge.findAll()
        res.json(challenges);
    } catch(e){
        next(e);
    }   
});