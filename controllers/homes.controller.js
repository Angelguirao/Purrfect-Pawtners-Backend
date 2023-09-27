const Home = require('../models/Home.model');
const User = require("../models/User.model");

// Handle creating a new home and updating the user's homes
exports.createHome = async (req, res) => {
    try {
        const payload = req.body;
        const newHome = await Home.create(payload);
        
        // Update the user's document to include the new home's ID
        await User.findByIdAndUpdate(
            payload.Owner, // Assuming Owner field contains the user's ID
            { $push: { house: newHome._id } },
            { new: true }
        );
        
        res.status(201).json(newHome);
    } catch (err) {
        console.error("Error creating home:", err);
        res.status(500).json(err);
    }
};

// Handle fetching all homes
exports.getAllHomes = async (req, res) => {
    try {
        const homes = await Home.find();
        res.status(200).json(homes);
    } catch (err) {
        console.error("Error fetching homes:", err);
        res.status(500).json(err);
    }
};

// Handle fetching details of one home
exports.getHomeById = async (req, res) => {
    try {
        const home = await Home.findById(req.params.id).populate('Owner');
        res.status(200).json(home);
    } catch (err) {
        console.error("Error fetching home:", err);
        res.status(500).json(err);
    }
};

// Handle updating one home
exports.updateHomeById = async (req, res) => {
    try {
        const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(202).json(updatedHome);
    } catch (err) {
        console.error("Error updating home:", err);
        res.status(500).json(err);
    }
};

// Handle deleting one home
exports.deleteHomeById = async (req, res) => {
    try {
        await Home.findByIdAndRemove(req.params.id);
        res.status(202).json({ message: "Home deleted" });
    } catch (err) {
        console.error("Error deleting home:", err);
        res.status(500).json(err);
    }
};
