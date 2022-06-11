const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/friendrequests", require("./friendrequests"));
router.use("/challenges", require("./challenges"));
router.use("/googleOauth", require("./googleOauth"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
