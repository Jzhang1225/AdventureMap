const router = require("express").Router();
const {
  models: { Message },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body)
    res.status(200).json(newMessage)
  } 
  catch (err) {
    next(err);
  }
});

router.get('/', async(req, res, next) => {
  try{
    const allMessages = await Message.findAll();
    res.send(allMessages)
  }
  catch(err) {
    next(err)
  }
})

router.get('/:conversationId', async(req, res, next) => {
  try{
    const messages = await Message.findAll({
      where: {
        conversationId: req.params.conversationId
      }
    })
    res.send(messages)
  }
  catch(err){
    next(err)
  }
})