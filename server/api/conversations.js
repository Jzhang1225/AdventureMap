const router = require("express").Router();
const {
  models: { Conversation },
} = require("../db");
module.exports = router;

const Op = require("sequelize").Op;

router.post("/", async (req, res, next) => {
  try {
    if (req.body.friend.id) {
      const newConversation = await Conversation.create({
        senderId: req.body.auth.id,
        receiverId: req.body.friend.id,
      });
      res.status(200).json(newConversation);
    } else {
      const newConversation = await Conversation.create(req.body);
      res.status(200).json(newConversation);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll();
    res.json(conversations);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const conversation = await Conversation.findAll({
      where: {
        [Op.or]: [{ senderId: req.params.id }, { receiverId: req.params.id }],
      },
    });
    res.json(conversation);
  } catch (err) {
    next(err);
  }
});
