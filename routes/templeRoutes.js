const express = require("express");
const {
    addTemple,
    getTemples,
} = require("../controllers/templeController");

const router = express.Router();

router.post("/add", addTemple);
router.get("/", getTemples);

module.exports = router;