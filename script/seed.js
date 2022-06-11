const {
  db,
  models: { User, Challenge, FriendRequest, Conversation, Message },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const [cody, murphy, susan, stanley, Jianing, Cathy, Stephan, Evelyn] =
    await Promise.all([
      await User.create({
        username: "cody",
        password: "123",
        points: 400,
        streetAddress: "123 Fake Street",
        city: "Springfield",
        state: "Oregon",
        zip: 94461,
        email: "fake-email@gmail.com",
      }),
      await User.create({
        username: "murphy",
        password: "123",
        points: 650,
        streetAddress: "456 Real Drive",
        city: "Ordinary City",
        state: "Utah",
        zip: 65416,
        email: "real-email@gmail.com",
      }),
      await User.create({
        username: "susan",
        password: "123",
        points: 240,
        streetAddress: "789 Real Street",
        city: "Strange City",
        state: "Ohio",
        zip: 51655,
        email: "real-email43@gmail.com",
      }),
      await User.create({
        username: "stanley",
        password: "123",
        points: 10,
        streetAddress: "345 Text Street",
        city: "Ohoy",
        state: "Maine",
        zip: 12346,
        email: "remasdasdail@gmail.com",
      }),
      await User.create({
        username: "Jianing",
        password: "123",
      }),
      await User.create({
        username: "Cathy",
        password: "123",
      }),
      await User.create({
        username: "Stephan",
        password: "123",
      }),
      await User.create({
        username: "Evelyn",
        password: "123",
      }),
    ]);

  const friendrequests = await Promise.all([
    FriendRequest.create({
      userId: cody.id,
      friendId: Jianing.id,
    }),
    FriendRequest.create({
      userId: murphy.id,
      friendId: stanley.id,
    }),
    FriendRequest.create({
      userId: cody.id,
      friendId: susan.id,
      status: "accepted",
    }),
    FriendRequest.create({
      userId: cody.id,
      friendId: Cathy.id,
      status: "accepted",
    }),
    FriendRequest.create({
      userId: murphy.id,
      friendId: Stephan.id,
      status: "accepted",
    }),
    FriendRequest.create({
      userId: murphy.id,
      friendId: Evelyn.id,
      status: "accepted",
    }),
  ]);

  const conversations = await Promise.all([
    Conversation.create({
      senderId: 8,
      receiverId: 6
    }),
    Conversation.create({
      senderId: 8,
      receiverId: 3
    }),
    Conversation.create({
      senderId: 4,
      receiverId: 8
    }),
    Conversation.create({
      senderId: 5,
      receiverId: 6
    }),
  ]);

  const messages = await Promise.all([
    Message.create({
      sender: 8,
      text: "Yo yo yo",
      conversationId: 2
    }),
    Message.create({
      sender: 6,
      text: "Greetings",
      conversationId: 2
    }),
    Message.create({
      sender: 8,
      text: "What it do",
      conversationId: 3
    }),
  ])

  console.log(`seeded successfully`);
  return [cody, murphy, susan, stanley, Jianing, Cathy, Stephan, Evelyn];
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
