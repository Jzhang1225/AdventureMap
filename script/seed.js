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
    points: 500,
    streetAddress: "142-30 Barclay Ave",
    city: "Queens",
    state: "NY",
    zip: 11355,
    avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
  });
  const [cody, murphy, susan, stanley, Jianing, Cathy, Evelyn] =
    await Promise.all([
      await User.create({
        username: "cody",
        password: "123",
        points: 400,
        streetAddress: "152-03 Northern Blvd",
        city: "Queens",
        state: "NY",
        zip: 11354,
        email: "fake-email@gmail.com",
        avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
      }),
      await User.create({
        username: "murphy",
        password: "123",
        points: 650,
        streetAddress: "51-35 Northern Blvd",
        city: "Queens",
        state: "NY",
        zip: 11377,
        email: "real-email@gmail.com",
        avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
      }),
      await User.create({
        username: "susan",
        password: "123",
        points: 240,
        streetAddress: "33-80 Queens Blvd",
        city: "Queens",
        state: "NY",
        zip: 11101,
        email: "real-email43@gmail.com",
        avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
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
        avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
      }),
      await User.create({
        username: "Jianing",
        password: "123",
        firstName: "Jianing",
        lastName: "Zhang",
        email: "jianing@fullstack.com",
        streetAddress: "101 Main Street",
        city: "Queens",
        state: "New York",
        zip: "11354",
        points: 80,
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
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
        points: 470,
        admin: true,
        avatar: `avatar-${Math.ceil(Math.random() * 62)}.jpeg`,
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
        points: 250,
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
    Array(200)
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
    Challenge.create({
      name: "Go to the Museum of Modern Art",
      points: 20,
      creator: stanley.username,
      locationName: "The Museum of Modern Art",
      streetAddress: "11 W 53rd St",
      city: "New York",
      state: "New York",
      zip: 10019,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Medium",
      description:
        "Learn to be a modern day Picasso by absorbing some of the worlds finest art",
    }),
    Challenge.create({
      name: "Read at a Library for an hour",
      points: 20,
      locationName: "Queens Public Library",
      streetAddress: "41-17 Main St",
      city: "Flushing",
      state: "New York",
      zip: 11355,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Medium",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description:
        "Read a bit and increase your brain size. You can show off big words like Acrimonious to your friends.",
    }),
    Challenge.create({
      name: "Go to Kissena Park",
      points: 20,
      locationName: "Kissena Park",
      streetAddress: "Booth Memorial Ave",
      city: "Fresh Meadows",
      state: "New York",
      zip: 11365,
      startDate: "2022/06/20",
      endDate: "2022/07/15",
      difficulty: "Easy",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description:
        "Go and enjoy some fresh air at the Park. Maybe ride a bike or jog a bit while your there.",
    }),
    Challenge.create({
      name: "Go to Columbus Park",
      points: 30,
      locationName: "Columbus Park",
      streetAddress: "Baxter St",
      city: "New York City",
      state: "New York",
      zip: 10013,
      startDate: "2022/06/24",
      endDate: "2022/07/05",
      difficulty: "Medium",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description:
        "Go and enjoy some fresh air at the Park. Maybe ride a bike or jog a bit while your there.",
    }),
    Challenge.create({
      name: "Visit the NYC Hall",
      points: 20,
      locationName: "New York City Hall",
      streetAddress: "City Hall Park",
      city: "New York City",
      state: "New York",
      zip: 10007,
      startDate: "2022/06/24",
      endDate: "2022/07/08",
      difficulty: "Easy",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Visit the City Hall and absorb some of the history.",
    }),
    Challenge.create({
      name: "Ride the SeaGlass Carousel",
      points: 20,
      locationName: "SeaGlass Carousel",
      streetAddress: "Pearl Street",
      city: "Battery Park",
      state: "New York",
      zip: 10004,
      startDate: "2022/06/24",
      endDate: "2022/07/08",
      difficulty: "Easy",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Ride the SeaGlass Carousel and enjoy being a kid again.",
    }),
    Challenge.create({
      name: "Visit the East River State Park",
      points: 30,
      locationName: "Marsha P. Johnson State Park",
      streetAddress: "90 Kent Ave",
      city: "Brooklyn",
      state: "New York",
      zip: 11249,
      startDate: "2022/06/24",
      endDate: "2022/07/08",
      difficulty: "Medium",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
    }),
    Challenge.create({
      name: "Climb to the Top of the Rock",
      points: 50,
      locationName: "Top of The Rock",
      streetAddress: "West 50th Street",
      city: "New York City",
      state: "New York",
      zip: 10111,
      startDate: "2022/06/24",
      endDate: "2022/07/20",
      difficulty: "Hard",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
    }),
    Challenge.create({
      name: "Win a match at the World's largest Chessboard",
      points: 50,
      locationName: "World's Largest Chess Board",
      streetAddress: "767 Third Ave",
      city: "New York",
      state: "New York",
      zip: 10017,
      startDate: "2022/06/24",
      endDate: "2022/07/20",
      difficulty: "Hard",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description:
        "Play a large game of chess and maybe you can challenge Magnus for the world championship.",
    }),
    Challenge.create({
      name: "Grab food at the Grand Central Terminal",
      points: 30,
      locationName: "Grand Central Terminal",
      streetAddress: "89 E 42nd St",
      city: "New York",
      state: "New York",
      zip: 10017,
      startDate: "2022/06/24",
      endDate: "2022/07/01",
      difficulty: "Medium",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Explore Grand Central and the foods available.",
    }),
    Challenge.create({
      name: "Climb at Adventure Untamed",
      points: 50,
      locationName: "Adventure Untamed",
      streetAddress: "447 Broadway",
      city: "New York",
      state: "New York",
      zip: 10017,
      startDate: "2022/06/24",
      endDate: "2022/07/01",
      difficulty: "Hard",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Enjoy some climbing and unleash your inner monkey.",
    }),
    Challenge.create({
      name: "Work out at Grassroots Fitness Project",
      points: 30,
      locationName: "Grassroots Fitness Project",
      streetAddress: "371 Amsterdam Ave",
      city: "New York",
      state: "New York",
      zip: 10024,
      startDate: "2022/06/24",
      endDate: "2022/07/10",
      difficulty: "Medium",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Train your body and workout at Grassroots.",
    }),
    Challenge.create({
      name: "Watch the new Elvis film",
      points: 20,
      locationName: "AMC Kips Bay 15",
      streetAddress: "570 2nd Ave",
      city: "New York",
      state: "New York",
      zip: 10016,
      startDate: "2022/06/24",
      endDate: "2022/07/19",
      difficulty: "Easy",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Chill and checkout the Elvis film at AMC.",
    }),
    Challenge.create({
      name: "Watch Hamilton",
      points: 50,
      locationName: "Richard Rodgers Theatre",
      streetAddress: "226 W 46th St",
      city: "New York",
      state: "New York",
      zip: 10036,
      startDate: "2022/06/24",
      endDate: "2022/07/20",
      difficulty: "Hard",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Turn back time and Watch Hamilton.",
    }),
    Challenge.create({
      name: "Eat Pizza",
      points: 20,
      locationName: "NY Pizza Suprema",
      streetAddress: "413 8th Ave",
      city: "New York",
      state: "New York",
      zip: 10001,
      startDate: "2022/06/24",
      endDate: "2022/06/31",
      difficulty: "Easy",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Eat pizza, not Chicago `pizza`, real pizza.",
    }),
    Challenge.create({
      name: "Go to a Park",
      points: 10,
      locationName: "Queens Botanical Garden",
      streetAddress: "43-50 Main Street",
      city: "Flushing",
      state: "New York",
      zip: 10019,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Easy",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description:
        "Go and enjoy some fresh air at the Park. Maybe ride a bike or jog a bit while your there.",
    }),
    Challenge.create({
      name: "Eat 10 Buns",
      points: 20,
      locationName: "New Flushing Bakery",
      streetAddress: "135-45 Roosevelt Ave",
      city: "Queens",
      state: "New York",
      zip: 11354,
      startDate: "2022/06/05",
      endDate: "2022/06/10",
      difficulty: "Medium",
      creator: newUsers(Math.floor(Math.random() * newUsers.length)).username,
      description: "Eat buns, get fat and enjoy.",
    }),
  ]);

  const challengeLine = await Promise.all([
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 1,
      completed: true,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 2,
      completed: true,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 3,
      completed: true,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 4,
      completed: true,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 5,
      completed: true,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 6,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 7,
      completed: true,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 8,
    }),
    ChallengeLine.create({
      userId: Stefan.id,
      challengeId: 9,
    }),
  ]);
  const challengesLines = await Promise.all(
    Array(100)
      .fill("")
      .map((__) => ChallengeLine.createRandom(User, Challenge))
  );

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
