const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../backend/controllers/auth.controller");
const protect = require("../backend/middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);

module.exports = router;
