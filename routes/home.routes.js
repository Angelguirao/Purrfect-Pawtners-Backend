const router = require('express').Router();
const homesController = require('../controllers/homes.controller');

// @route   POST /homes
// @desc    Create a new home and update the user's homes
router.post('/homes', homesController.createHome);

// @route   GET /homes
// @desc    Fetch all homes
router.get('/homes', homesController.getAllHomes);

// @route   GET /homes/:id
// @desc    Fetch details of one home by ID
router.get('/homes/:id', homesController.getHomeById);

// @route   PUT /homes/:id
// @desc    Update one home by ID
router.put('/homes/:id', homesController.updateHomeById);

// @route   DELETE /homes/:id
// @desc    Delete one home by ID
router.delete('/homes/:id', homesController.deleteHomeById);

module.exports = router;
