const {
  db,
  models: {
    User,
    Challenge,
    FriendRequest,
    Conversation,
    Message,
    ChallengeLine,
  },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");
  const Stefan = await User.create({
    username: "Stefan",
    password: "123",
    firstName: "Stefan",
    lastName: "Mitrovic",
    email: "stefan@fullstack.com",
    streetAddress: "101 Main Street",
    city: "Richmond",
    state: "Virginia",
    zip: "23220",
    admin: true,
    avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
  });
  const [cody, murphy, susan, stanley, Jianing, Cathy, Evelyn] =
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
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
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
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
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
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
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
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
      }),
      await User.create({
        username: "Jianing",
        password: "123",
        firstName: "Jianing",
        lastName: "Zhang",
        email: "jianing@fullstack.com",
        streetAddress: "3909 Main Street",
        city: "Queens",
        state: "New York",
        zip: "11354",
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
      }),
      await User.create({
        username: "Cathy",
        password: "123",
        firstName: "Cathy",
        lastName: "Lu",
        email: "cathy@fullstack.com",
        streetAddress: "101 Main Street",
        city: "Boston",
        state: "Massachusetts",
        zip: "02115",
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
      }),
      await User.create({
        username: "Evelyn",
        firstName: "Evelyn",
        password: "123",
        lastName: "Rodriguez",
        email: "evelyn@fullstack.com",
        streetAddress: "101 Main Street",
        city: "Brooklyn",
        state: "New York",
        zip: "11224",
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
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

  const newFriendRequests = await Promise.all(
    Array(100)
      .fill("")
      .map((__) => FriendRequest.createRandom(User))
  );

  const conversations = await Promise.all([
    Conversation.create({
      senderId: 8,
      receiverId: 6,
    }),
    Conversation.create({
      senderId: 8,
      receiverId: 3,
    }),
    Conversation.create({
      senderId: 4,
      receiverId: 8,
    }),
    Conversation.create({
      senderId: 5,
      receiverId: 6,
    }),
  ]);

  const messages = await Promise.all([
    Message.create({
      sender: 8,
      text: "Yo yo yo",
      conversationId: 2,
    }),
    Message.create({
      sender: 6,
      text: "Greetings",
      conversationId: 2,
    }),
    Message.create({
      sender: 8,
      text: "What it do",
      conversationId: 3,
    }),
  ]);
  const challenges = await Promise.all([
    // Challenge.create({
    //   name: "Take a hike",
    //   points: 10,
    //   streetAddress: "fake street NW",
    //   startDate: "2022/06/05",
    //   endDate: "2022/06/10",
    //   difficulty: "Hard",
    // }),
    // Challenge.create({
    //   name: "Take a hike again",
    //   points: 10,
    //   streetAddress: "fake street NW",
    //   startDate: "2022/06/05",
    //   endDate: "2022/06/10",
    //   difficulty: "Hard",
    // }),
    // Challenge.create({
    //   name: "Look at art",
    //   points: 10,
    //   streetAddress: "fake street NW",
    //   startDate: "2022/06/05",
    //   endDate: "2022/06/10",
    //   difficulty: "Easy",
    // }),
    // Challenge.create({
    //   name: "Go ride a bike",
    //   points: 10,
    //   streetAddress: "fake street NW",
    //   startDate: "2022/06/05",
    //   endDate: "2022/06/10",
    //   difficulty: "Medium",
    // }),
    Challenge.create({
      name: "Go to a Museum",
      points: 20,
      streetAddress: "11 W 53rd St",
      city: "New York",
      state: "New York",
      zip: 10019,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Medium",
    }),
    Challenge.create({
      name: "Go to a Museum",
      points: 20,
      streetAddress: "41-17 Main St",
      city: "Flushing",
      state: "New York",
      zip: 11355,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Medium",
    }),
    Challenge.create({
      name: "Go to a Park",
      points: 10,
      streetAddress: "43-50 Main Street",
      city: "Flushing",
      state: "New York",
      zip: 10019,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Easy",
    }),
    Challenge.create({
      name: "Eat 10 Buns",
      points: 20,
      streetAddress: "135-45 Roosevelt Ave",
      city: "Queens",
      state: "New York",
      zip: 11354,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Medium",
    }),
  ]);

  const challengeLine = await Promise.all([
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 1,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 2,
    }),
    ChallengeLine.create({
      userId: Cathy.id,
      challengeId: 3,
    }),
    ChallengeLine.create({
      userId: Cathy.id,
      challengeId: 4,
    }),
    // }),
    // ChallengeLine.create({
    //   userId: Jianing.id,
    //   challengeId: 3,
    // }),
    // ChallengeLine.create({
    //   userId: stanley.id,
    //   challengeId: 2,
    // }),
    // ChallengeLine.create({
    //   userId: Evelyn.id,
    //   challengeId: 2,
    // }),
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
