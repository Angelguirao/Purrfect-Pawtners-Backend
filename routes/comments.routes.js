const router = require("express").Router();
const Comment = require('../models/Comment.model');
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

router.get('/info/:id', async (req, res) => {
    const params = req.params.id
    
    try {
        const comment = await Comment.findById(params)
        res.status(200).json(comment);
    } catch (err) {
        console.error("Error fetching comment:", err);
        res.status(500).json(err);
    }
});

router.post('/:id', async (req, res) => {
    const payload = req.body.payload
        console.log("your payload is:", payload)
    try {
        
        const newComment = await Comment.create(payload);
        await User.findByIdAndUpdate(payload.receptor,
            { $push: { comments: newComment } }, 
            { new: true });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
        console.log("your error si", err)
    }
});

module.exports = router