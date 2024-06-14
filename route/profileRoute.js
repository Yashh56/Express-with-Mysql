const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const { verifyToken } = require("../config/middleware");
router.get("/profile", verifyToken, profileController.profile);

module.exports = router;
