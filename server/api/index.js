const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/friendrequests", require("./friendrequests"));
<<<<<<< HEAD
router.use("/conversations", require("./conversations"));
router.use("/messages", require("./messages"));
=======
router.use("/challenges", require("./challenges"));
router.use("/challengeLine", require("./challengeLine"));
router.use("/googleOauth", require("./googleOauth"));
>>>>>>> main

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
