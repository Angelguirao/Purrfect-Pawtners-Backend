const router = require("express").Router();
const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/jwt.middleware');

// @route   GET /
// @desc    Test route to check if auth is working
router.get('/', (req, res) => res.json('All good in auth'));

// @route   POST /signup
// @desc    Route to handle user signup
router.post('/signup', authController.signup);

// @route   POST /login
// @desc    Route to handle user login
router.post('/login', authController.login);

// @route   GET /verify
// @desc    Route to verify JWT token and return the current user
// @access  Protected
router.get('/verify', isAuthenticated, authController.verify);

// @route   GET /:id
// @desc    Route to get a user by ID
router.get("/:id", authController.getUserById);

module.exports = router;
