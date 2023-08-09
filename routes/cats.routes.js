const Cat = require("../models/Cat.model");

const router = require("express").Router();

//🐱 GET to show all cats (read)
router.get("/", async (req, res, next) => {
    try {
        const cats = await Cat.find();
        console.log("cats", cats);
        res.status(200).json(cats);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 GET details of one cat (read)
router.get("/:id", async (req, res, next) => {
    try {
        const cat = await Cat.findById(req.params.id);
        res.status(200).json(cat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 POST adopt one cat (create)
router.post("/:id/adopt", async (req, res, next) => {
    try {
        const payload = req.body;
        const adoptedCat = Cat.create(payload);
        res.status(201).json(adoptedCat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 POST for adoption one cat (create)
router.post("/", async (req, res, next) => {
    try {
        const payload = req.body;
        const toBeAdoptedCat = Cat.create(payload);
        res.status(201).json(toBeAdoptedCat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

// 🐱 PUT one cat (update)
router.put("/:id", async (req, res, next) => {
    try {
        const payload = req.body;
        const updatedcat = await Cat.findByIdAndUpdate(req.params.id, payload);
        res.status(202).json(updatedcat);
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});
// 🐱 DELETE one cat (delete)
router.delete("/:id", async (req, res, next) => {
    try {
        await Cat.findByIdAndDelete(req.params.id);
        res.status(202).json({ message: "Post deleted" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json(error);
    }
});

module.exports = router;
