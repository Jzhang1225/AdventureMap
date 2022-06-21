const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')
const seed = require('../script/seed');
const { Server } = require("socket.io");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
    const io = new Server(server)

    let users = [];

    const addUser = (userId, socketId) => {
      !users.some(user => user.userId === userId) &&
      users.push({ userId, socketId })
    };

    const removeUser = (socketId) => {
      users = users.filter((user) => user.socketId !== socketId)
    };

    const getUser = (userId) => {
      return users.find( user => user.userId  === userId)
    };

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users)
      });

      //send and get message
      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
          senderId, 
          text
        });
      });

      socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
    });

  } catch (ex) {
    console.log(ex);
  }
};

init();
