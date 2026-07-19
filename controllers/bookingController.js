const Booking = require("../models/booking");

// Book Darshan
const bookDarshan = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();

        res.status(201).json({
            message: "Darshan booked successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("user")
            .populate("temple");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    bookDarshan,
    getBookings
};