const {
  db,
  models: { User },
} = require("../server/db");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
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
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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
