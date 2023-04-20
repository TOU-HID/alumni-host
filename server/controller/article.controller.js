const Article = require('../models/article.model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dgsx9bvvf',
  api_key: '781359287982441',
  api_secret: '7hNsft3DsqCYAcy9kl8e4noM7zI',
});

const getAllArticle = async (req, res) => {
  try {
    const articles = await Article.find();
    console.log(articles);
    res.status(200);
    res.send({
      status: 'success',
      data: articles,
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

const addArticle = async (req, res) => {
  try {
    console.log(req.body);
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      // console.log(result);
      const article = new Article({
        title: req.body.title,
        author: req.body.author,
        authorId: req.body.authorId,
        description: req.body.description,
        category: req.body.category,
        email: req.body.email,
        authorUrl: req.body.authorUrl,
        imageUrl: result.url,
      });
      article.save().then((response) => {
        console.log(response);
        res.status(200).json({
          status: 'success',
          message: 'Posted successfully',
          data: response,
        });
      });
    });
  } catch (error) {
    res.status(400);
    res.send({
      status: 'failure',
      message: error.message,
    });
  }
};

module.exports = { getAllArticle, addArticle };
