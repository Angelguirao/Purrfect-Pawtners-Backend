const Article = require('../models/Article.model');

// Handle creating a new article and updating the user's articles
exports.createArticle = async (req, res) => {
    try {
        const payload = req.body;
        const newArticle = await Article.create(payload);
        
        // Update the user's articles
        await User.findByIdAndUpdate(payload.author,
            { $push: { articles: newArticle } }, 
            { new: true });
        
        res.status(201).json(newArticle);
    } catch (err) {
        console.error("Error creating article:", err);
        res.status(500).json(err);
    }
};

// Handle fetching all articles
exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Unable to fetch articles' });
  }
};

// Handle fetching an article by ID
exports.getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ errorMessage: 'Article not found' });
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Unable to fetch article' });
  }
};

// Handle updating an article by ID
exports.updateArticleById = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ errorMessage: 'Article not found' });
    return res.status(200).json(article);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Unable to update article' });
  }
};

// Handle deleting an article by ID
exports.deleteArticleById = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ errorMessage: 'Article not found' });
    return res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Unable to delete article' });
  }
};
