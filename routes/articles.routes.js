const router = require("express").Router();
const articlesController = require('../controllers/articles.controller');

// @route   POST /
// @desc    Create a new article and update the user's articles
router.post('/', articlesController.createArticle);

// @route   GET /
// @desc    Fetch all articles
router.get('/', articlesController.getArticles);

// @route   GET /:id
// @desc    Fetch details of one article by ID
router.get('/:id', articlesController.getArticleById);

// @route   PUT /:id
// @desc    Update one article by ID
router.put('/:id', articlesController.updateArticleById);

// @route   DELETE /:id
// @desc    Delete one article by ID
router.delete('/:id', articlesController.deleteArticleById);

module.exports = router;

