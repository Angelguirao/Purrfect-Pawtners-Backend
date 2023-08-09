const Cat = require("../models/Cat.model");
const User = require("../models/User.model");

const router = require("express").Router();

//🐱 GET to show all cats (read)
router.get("/cats", async (req, res, next) => {
    try {
        const cats = await Cat.find();
        res.status(200).json(cats);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 GET details of one cat (read)
router.get("/cats/:id", async (req, res, next) => {
    try {
        const cat = await Cat.findById(req.params.id).populate("Owner");
        res.status(200).json(cat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 POST adopt one cat (create)
router.post("/cats/:id/adopt", async (req, res, next) => {
    try {
        const payload = req.body;
        const adoptedCat = await Cat.create(payload);
        res.status(201).json(adoptedCat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 POST for adoption one cat (create)
router.post("/cats", async (req, res, next) => {
    try {
        const payload = req.body;
        // Create the cat
        const toBeAdoptedCat = await Cat.create(payload);
        
        // Update the user's document to include the new cat's ID
        await User.findByIdAndUpdate(
            payload.Owner, // Assuming Owner field contains the user's ID
            { $push: { cat: toBeAdoptedCat._id } },
            { new: true }
        );
        
        res.status(201).json(toBeAdoptedCat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 PUT one cat (update)
router.put("/cats/:id", async (req, res, next) => {
    try {
        const payload = req.body;
        const updatedcat = await Cat.findByIdAndUpdate(req.params.id, payload,{new: true});
        res.status(202).json(updatedcat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});
// 🐱 DELETE one cat (delete)
router.delete("/cats/:id", async (req, res, next) => {
    try {
        await Cat.findByIdAndDelete(req.params.id);
        res.status(202).json({ message: "Post deleted" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

module.exports = router;
