const router = require('express').Router();
const homesController = require('../controllers/homes.controller');

// @route   POST /
// @desc    Create a new home and update the user's homes
router.post('/', homesController.createHome);

// @route   GET /
// @desc    Fetch all homes
router.get('/', homesController.getAllHomes);

// @route   GET /:id
// @desc    Fetch details of one home by ID
router.get('/:id', homesController.getHomeById);

// @route   PUT /:id
// @desc    Update one home by ID
router.put('/:id', homesController.updateHomeById);

// @route   DELETE /:id
// @desc    Delete one home by ID
router.delete('/:id', homesController.deleteHomeById);

module.exports = router;
