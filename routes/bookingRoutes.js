const express = require("express");
const {
    bookDarshan,
    getBookings
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/book", bookDarshan);
router.get("/", getBookings);

module.exports = router;

