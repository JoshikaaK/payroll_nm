const express = require("express");
const router = express.Router();

const {
  saveStatutoryConfig,
  getStatutoryConfig
} = require("../controllers/statutory.controller");

const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

// Only SuperAdmin & PayrollAdmin allowed
router.post(
  "/",
  protect,
  authorizeRoles("SuperAdmin", "PayrollAdmin"),
  saveStatutoryConfig
);

router.get(
  "/",+

  protect,
  authorizeRoles("SuperAdmin", "PayrollAdmin"),
  getStatutoryConfig
);

module.exports = router;
