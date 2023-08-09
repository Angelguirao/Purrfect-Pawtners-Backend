const router = require("express").Router();
const Comment = require('../models/Article.model');
const User = require("../models/User.model");

router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.find()
        res.status(200).json(comment);
    } catch (err) {
        console.error("Error fetching comment:", err);
        res.status(500).json(err);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const payload = req.body
        const newComment = await Comment.create(payload);
        await User.findByIdAndUpdate(payload.receptor,
            { $push: { comments: newComment } }, 
            { new: true });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router