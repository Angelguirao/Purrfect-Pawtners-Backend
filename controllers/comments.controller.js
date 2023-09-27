const Comment = require('../models/Comment.model');
const User = require("../models/User.model");

// Handle fetching all comments
exports.getAllComments = async (req, res) => {
    try {
        const comment = await Comment.find();
        res.status(200).json(comment);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json(err);
    }
};

// Handle fetching details of one comment
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        console.error("Error fetching comment:", err);
        res.status(500).json(err);
    }
};

// Handle creating a new comment and updating the user's comments
exports.createComment = async (req, res) => {
    try {
        const payload = req.body.payload;
        const newComment = await Comment.create(payload);
        
        // Update the user's document to include the new comment's ID
        await User.findByIdAndUpdate(payload.receptor,
            { $push: { comments: newComment } }, 
            { new: true });
        
        res.status(201).json(newComment);
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json(err);
    }
};

// Handle deleting one comment
exports.deleteCommentById = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        res.status(202).json(comment);
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json(err);
    }
};
