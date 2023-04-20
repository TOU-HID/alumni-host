const { Schema, model } = require('mongoose');

const expertSchema = new Schema({
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
  category: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  pending: {
    type: Array,
    required: true,
  },
  approved: {
    type: Array,
    required: true,
  },
});

const Expert = model('Expert', expertSchema);
module.exports = Expert;
