const router = require('express').Router()
const Home = require('../models/Home.model');
const User = require("../models/User.model");

// POST request to create Home - "C"RUD
router.post('/homes', async (req, res) => {
    try {
        const payload = req.body
        const newHome = await Home.create(payload);

         // Update the user's document to include the new home's ID
        await User.findByIdAndUpdate(
            payload.Owner, // Assuming Owner field contains the user's ID
            { $push: { house: newHome._id } },
            { new: true }
        );
        res.status(201).json(newHome);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET request to get a list of Homes - C"R"UD
router.get('/homes', async (req, res) => {
    try {
        const homes = await Home.find()//.populate('Owner')//.populate('Friends');
        res.status(200).json(homes);
    } catch (err) {
        console.error("Error fetching homes:", err);
        res.status(500).json(err);
    }
});

// GET request to get a specific Home - C"R"UD
router.get('/homes/:id', async (req, res) => {
    try {
        const home = await Home.findById(req.params.id).populate('Owner')//.populate('Friends');
        res.status(200).json(home);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT request to update a Home - CR"U"D
router.put('/homes/:id', async (req, res) => {
    try {
        const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(202).json(updatedHome);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE request to delete a Home - CRU"D"
router.delete('/homes/:id', async (req, res) => {
    try {
        await Home.findByIdAndRemove(req.params.id);
        res.status(202).json({message: "Home deleted"});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
