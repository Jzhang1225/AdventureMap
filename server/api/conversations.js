const router = require("express").Router();
const {
  models: { Conversation },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const newConversation = await Conversation.create(req.body)
    res.status(200).json(newConversation)
  } catch (err) {
    next(err);
  }
});

router.get('/', async(req, res, next) => {
  try{
    const conversations = await Conversation.findAll();
    res.json(conversations)
  }
  catch(err) {
    next(err)
  }
})

router.get('/:id', async(req, res, next) => {
  try{
    const conversation = await Conversation.findAll({
      where: {
        senderId: req.params.id
      },
  })
  res.json(conversation)
  }
  catch(err) {
    next(err)
  }
})