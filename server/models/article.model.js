const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  authorUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now() },
});

const Article = model('Article', articleSchema);

module.exports = Article;
