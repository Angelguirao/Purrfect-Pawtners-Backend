const router = require("express").Router();
const catsController = require('../controllers/cats.controller');

// @route   GET /
// @desc    Fetch all cats
router.get("/", catsController.getAllCats);

// @route   GET /:id
// @desc    Fetch details of one cat by ID
router.get("/:id", catsController.getCatById);

// @route   POST /:id/adopt
// @desc    Adopt one cat
router.post("/:id/adopt", catsController.adoptCat);

// @route   POST /
// @desc    Post one cat for adoption and update the user's cats
router.post("/", catsController.postCatForAdoption);

// @route   PUT /:id
// @desc    Update one cat by ID
router.put("/:id", catsController.updateCatById);

// @route   DELETE /:id
// @desc    Delete one cat by ID
router.delete("/:id", catsController.deleteCatById);

module.exports = router;
