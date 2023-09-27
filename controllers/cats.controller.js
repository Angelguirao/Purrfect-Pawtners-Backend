const Cat = require("../models/Cat.model");
const User = require("../models/User.model");

// Handle fetching all cats
exports.getAllCats = async (req, res) => {
    try {
        const cats = await Cat.find();
        res.status(200).json(cats);
    } catch (error) {
        console.error("Error fetching cats:", error);
        res.status(500).json(error);
    }
};

// Handle fetching details of one cat
exports.getCatById = async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id).populate("Owner");
        res.status(200).json(cat);
    } catch (error) {
        console.error("Error fetching cat:", error);
        res.status(500).json(error);
    }
};

// Handle adopting one cat
exports.adoptCat = async (req, res) => {
    try {
        const payload = req.body;
        const adoptedCat = await Cat.create(payload);
        res.status(201).json(adoptedCat);
    } catch (error) {
        console.error("Error adopting cat:", error);
        res.status(500).json(error);
    }
};

// Handle posting one cat for adoption
exports.postCatForAdoption = async (req, res) => {
    try {
        const payload = req.body;
        const toBeAdoptedCat = await Cat.create(payload);
        
        // Update the user's document to include the new cat's ID
        await User.findByIdAndUpdate(
            payload.Owner,
            { $push: { cat: toBeAdoptedCat._id } },
            { new: true }
        );
        
        res.status(201).json(toBeAdoptedCat);
    } catch (error) {
        console.error("Error posting cat for adoption:", error);
        res.status(500).json(error);
    }
};

// Handle updating one cat
exports.updateCatById = async (req, res) => {
    try {
        const payload = req.body;
        const updatedCat = await Cat.findByIdAndUpdate(req.params.id, payload, { new: true });
        res.status(202).json(updatedCat);
    } catch (error) {
        console.error("Error updating cat:", error);
        res.status(500).json(error);
    }
};

// Handle deleting one cat
exports.deleteCatById = async (req, res) => {
    try {
        await Cat.findByIdAndDelete(req.params.id);
        res.status(202).json({ message: "Cat deleted" });
    } catch (error) {
        console.error("Error deleting cat:", error);
        res.status(500).json(error);
    }
};
