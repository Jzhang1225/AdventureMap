//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Challenge = require('./models/Challenge')


User.hasMany(Challenge);


//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Challenge
  },
}
