const express = require("express");
const router = express.Router();

const {
  saveStatutoryConfig,
  getStatutoryConfig
} = require("../backend/controllers/statutory.controller");

const protect = require("../backend/middlewares/auth.middleware");
const authorizeRoles = require("../backend/middlewares/role.middleware");

// Only SuperAdmin & PayrollAdmin allowed
router.post(
  "/",
  protect,
  authorizeRoles("SuperAdmin", "PayrollAdmin"),
  saveStatutoryConfig
);

router.get(
  "/",
  protect,
  authorizeRoles("SuperAdmin", "PayrollAdmin"),
  getStatutoryConfig
);

module.exports = router;
