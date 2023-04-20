const { Router } = require('express');
const {
  getAllArticle,
  addArticle,
} = require('../controller/article.controller');

const router = Router();

router.get('/getAllArticles', getAllArticle);
router.post('/createArticle', addArticle);

module.exports = router;
