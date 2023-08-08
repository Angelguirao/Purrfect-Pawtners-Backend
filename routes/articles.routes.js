const router = require("express").Router();
const Article = require('../models/Article.model')

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find()
        res.status(200).json(articles);
    } catch (err) {
        console.error("Error fetching articles:", err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const payload = req.body
        const newArticle = await Article.create(payload);
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router