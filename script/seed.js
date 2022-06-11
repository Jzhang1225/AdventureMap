const {
  db,
  models: { User, Challenge, FriendRequest, ChallengeLine},
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const [cody, murphy, susan, stanley, Jianing, Cathy, Stefan, Evelyn] =
    await Promise.all([
      User.create({
        username: "cody",
        password: "123",
        points: 400,
        streetAddress: "123 Fake Street",
        city: "Springfield",
        state: "Oregon",
        zip: 94461,
        email: "fake-email@gmail.com",
      }),
      User.create({
        username: "murphy",
        password: "123",
        points: 650,
        streetAddress: "456 Real Drive",
        city: "Ordinary City",
        state: "Utah",
        zip: 65416,
        email: "real-email@gmail.com",
      }),
      User.create({
        username: "susan",
        password: "123",
        points: 240,
        streetAddress: "789 Real Street",
        city: "Strange City",
        state: "Ohio",
        zip: 51655,
        email: "real-email43@gmail.com",
      }),
      User.create({
        username: "stanley",
        password: "123",
        points: 10,
        streetAddress: "345 Text Street",
        city: "Ohoy",
        state: "Maine",
        zip: 12346,
        email: "remasdasdail@gmail.com",
      }),
      User.create({
        username: "Jianing",
        password: "123",
      }),
      User.create({
        username: "Cathy",
        password: "123",
      }),
      User.create({
        username: "Stefan",
        password: "123",
      }),
      User.create({
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
      friendId: Stefan.id,
      status: "accepted",
    }),
    FriendRequest.create({
      userId: murphy.id,
      friendId: Evelyn.id,
      status: "accepted",
    }),
  ]);

  const challenges = await Promise.all([
    Challenge.create({
      name: 'Take a hike',
      points: 10,
      address: 'fake street NW',
      startDate: '2022/06/05',
      endDate: '2022/06/10',
      difficulty: 5
    }),
    Challenge.create({
      name: 'Take a hike again',
      points: 10,
      address: 'fake street NW',
      startDate: '2022/06/05',
      endDate: '2022/06/10',
      difficulty: 5
    }),
    Challenge.create({
      name: 'Look at art',
      points: 10,
      address: 'fake street NW',
      startDate: '2022/06/05',
      endDate: '2022/06/10',
      difficulty: 5
    }),
    Challenge.create({
      name: 'Go ride a bike',
      points: 10,
      address: 'fake street NW',
      startDate: '2022/06/05',
      endDate: '2022/06/10',
      difficulty: 5
    }),
  ]);
  
  const challengeLine = await Promise.all([
    ChallengeLine.create({
      userId: 1,
      challengeId: 1
    })
  ])

  console.log(`seeded successfully`);
  return [cody, murphy, susan, stanley, Jianing, Cathy, Stefan, Evelyn, challenges, challengeLine];
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
