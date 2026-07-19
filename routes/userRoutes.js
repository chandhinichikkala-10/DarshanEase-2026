const express = require("express");
const {
    registerUser,
    loginUser,
    getUsers,
    testRoute
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/test", testRoute);

module.exports = router;