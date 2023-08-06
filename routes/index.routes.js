const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json("All good in here");
});

// 👇 Start handling routes here
const catsRoutes = require("./cats.routes");
router.use("/cats", catsRoutes);

module.exports = router;
