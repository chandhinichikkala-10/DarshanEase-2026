const Temple = require("../models/temple");

// Add Temple
const addTemple = async (req, res) => {
    try {
        const temple = new Temple(req.body);
        await temple.save();

        res.status(201).json({
            message: "Temple added successfully",
            temple,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Temples
const getTemples = async (req, res) => {
    try {
        const temples = await Temple.find();
        res.status(200).json(temples);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addTemple,
    getTemples,
};