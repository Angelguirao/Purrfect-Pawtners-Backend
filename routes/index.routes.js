const router = require("express").Router();
const indexController = require('../controllers/index.controller');

// @route   GET /
// @desc    Send a static response
router.get("/", indexController.getIndex);

module.exports = router;
