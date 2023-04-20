const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  booked: {
    type: Array,
    required: true,
  },
});

const User = model('User', userSchema);
module.exports = User;
