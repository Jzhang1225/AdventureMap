const {
  db,
  models: { User, Challenge, FriendRequest, Conversation, Message, ChallengeLine },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const [cody, murphy, susan, stanley, Jianing, Cathy, Stefan, Evelyn] =
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
        admin: true,
      }),
      await User.create({
        username: "Cathy",
        password: "123",
        admin: true,
      }),
      User.create({
        username: "Stefan",
        password: "123",
        admin: true,
      }),
      await User.create({
        username: "Evelyn",
        password: "123",
        admin: true,
      }),
    ]);

  const newUsers = await Promise.all(
    Array(50)
      .fill("")
      .map((__) => User.createRandom())
  );

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
      friendId: Stefan.id,
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
  const challenges = await Promise.all([
    Challenge.create({
      name: "Take a hike",
      points: 10,
      address: "fake street NW",
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: 'Hard',
    }),
    Challenge.create({
      name: "Take a hike again",
      points: 10,
      address: "fake street NW",
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: 'Hard',
    }),
    Challenge.create({
      name: "Look at art",
      points: 10,
      address: "fake street NW",
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: 'Easy',
    }),
    Challenge.create({
      name: "Go ride a bike",
      points: 10,
      address: "fake street NW",
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: 'Medium',
    }),
  ]);

  const challengeLine = await Promise.all([
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 1,
    }),
    ChallengeLine.create({
      userId: Jianing.id,
      challengeId: 3
    }),
    ChallengeLine.create({
      userId: stanley.id,
      challengeId: 2
    }),
    ChallengeLine.create({
      userId: Evelyn.id,
      challengeId: 2
    }),
  ]);

  console.log(`seeded successfully`);
  return [
    cody,
    murphy,
    susan,
    stanley,
    Jianing,
    Cathy,
    Stefan,
    Evelyn,
    challenges,
    challengeLine,
  ];
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
