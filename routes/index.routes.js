const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json("All good in here");
});

// 👇 Start handling routes here


module.exports = router;
