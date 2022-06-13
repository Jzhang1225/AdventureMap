const Sequelize = require("sequelize");
const { STRING, INTEGER } = Sequelize;
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { faker } = require("@faker-js/faker");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    },
  },
  points: {
    type: INTEGER,
    defaultValue: 0,
  },
  streetAddress: {
    type: STRING,
  },
  city: {
    type: STRING,
  },
  state: {
    type: STRING,
  },
  zip: {
    type: INTEGER,
  },
  avatar: {
    type: STRING,
    defaultValue: "/public/no-user-image.gif",
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.loginViaGoogle = async function (code) {
  const config = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    grant_type: "authorization_code",
    code,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_CALLBACK_URI,
  };
  let response = await axios.post(
    "https://oauth2.googleapis.com/token",
    config
  );
  response = await axios.get(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.data.access_token}`
  );
  const email = response.data.email;

  let user = await this.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    user = await this.create({
      email,
      username: response.data.name,
    });
  }
  return user.generateToken();
};

User.createRandom = async () => {
  await User.create({
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: "123",
    points: Math.ceil(Math.random() * 100) * 10,
    streetAddress: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode("#####") * 1,
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  });
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
