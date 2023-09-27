const router = require("express").Router();
const commentsController = require('../controllers/comments.controller');

// @route   GET /:id
// @desc    Fetch all comments
router.get('/:id', commentsController.getAllComments);

// @route   GET /info/:id
// @desc    Fetch details of one comment by ID
router.get('/info/:id', commentsController.getCommentById);

// @route   POST /:id
// @desc    Create a new comment and update the user's comments
router.post('/:id', commentsController.createComment);

// @route   DELETE /delete/:id
// @desc    Delete one comment by ID
router.delete('/delete/:id', commentsController.deleteCommentById);

module.exports = router;
