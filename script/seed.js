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
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
      }),
      await User.create({
        username: "Cathy",
        password: "123",
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
      }),
      // User.create({
      //   username: "Stefan",
      //   password: "123",
      //   admin: true,
      //   avatar: `avatar-${Math.ceil(Math.random() * 61)}.jpeg`,
      // }),
      await User.create({
        username: "Evelyn",
        password: "123",
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
      name:"Go to Kissena Park",
      points:20,
      sreetAddress:"Booth Memorial Ave",
      city:"Fresh Meadows",
      state:"New York",
      zip:11365,
      startDate:"2022/06/20",
      endDate:"2022/07/15",
      difficulty:"Easy",
    }),
    Challenge.create({
      name:"Go to Columbus Park",
      points:30,
      sreetAddress:"St. Baxter St",
      city:"New York City",
      state:"New York",
      zip:10013,
      startDate:"2022/06/24",
      endDate:"2022/07/05",
      difficulty:"Medium",
    }),
    Challenge.create({
      name:"Visit the NYC Hall",
      points:20,
      sreetAddress:"City Hall Park",
      city:"New York City",
      state:"New York",
      zip:10007,
      startDate:"2022/06/24",
      endDate:"2022/07/08",
      difficulty:"Easy",
    }),
    Challenge.create({
      name:"Ride the Sea Glass Carousel",
      points:20,
      sreetAddress:"Pearl Street",
      city:"Battery Park",
      state:"New York",
      zip:10004,
      startDate:"2022/06/24",
      endDate:"2022/07/08",
      difficulty:"Easy",
    }),
    Challenge.create({
      name:"Visit the East River State Park",
      points:30,
      sreetAddress:"90 Kent Ave",
      city:"Brooklyn",
      state:"New York",
      zip:11249,
      startDate:"2022/06/24",
      endDate:"2022/07/08",
      difficulty:"Medium",
    }),
    Challenge.create({
      name:"Climb to the Top of the Rock",
      points:50,
      sreetAddress:"West 50th Street",
      city:"New York City",
      state:"New York",
      zip:10111,
      startDate:"2022/06/24",
      endDate:"2022/07/20",
      difficulty:"Hard",
    }),
    Challenge.create({
      name:"Win a match at the World's largest Chessboard",
      points:50,
      sreetAddress:"767 Third Ave",
      city:"New York",
      state:"New York",
      zip:10017,
      startDate:"2022/06/24",
      endDate:"2022/07/20",
      difficulty:"Hard",
    }),
    Challenge.create({
      name:"Grab food at the Grand Central Terminal",
      points:30,
      sreetAddress:"89 E 42nd St",
      city:"New York",
      state:"New York",
      zip:10017,
      startDate:"2022/06/24",
      endDate:"2022/07/01",
      difficulty:"Medium",
    }),
    Challenge.create({
      name:"Climb at Adventure Untamed",
      points:50,
      sreetAddress:"447 Broadway",
      city:"New York",
      state:"New York",
      zip:10017,
      startDate:"2022/06/24",
      endDate:"2022/07/01",
      difficulty:"Hard",
    }),
    Challenge.create({
      name:"Work out at Grassroots Fitness Project",
      points:30,
      sreetAddress:"371 Amsterdam Ave",
      city:"New York",
      state:"New York",
      zip:10024,
      startDate:"2022/06/24",
      endDate:"2022/07/10",
      difficulty:"Medium",
    }),
    Challenge.create({
      name:"Watch the new Elvis film",
      points:20,
      sreetAddress:"570 2nd Ave",
      city:"New York",
      state:"New York",
      zip:10016,
      startDate:"2022/06/24",
      endDate:"2022/07/19",
      difficulty:"Easy",
    }),
    Challenge.create({
      name:"Watch Hamilton",
      points:50,
      sreetAddress:"226 W 46th St",
      city:"New York",
      state:"New York",
      zip:10036,
      startDate:"2022/06/24",
      endDate:"2022/07/20",
      difficulty:"Hard",
    }),
    Challenge.create({
      name:"Eat Pizza",
      points:20,
      sreetAddress:"413 8th Ave",
      city:"New York",
      state:"New York",
      zip:10001,
      startDate:"2022/06/24",
      endDate:"2022/06/31",
      difficulty:"Easy",
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
