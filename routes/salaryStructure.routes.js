const express = require("express");
const router = express.Router();

const {
  createSalaryStructure,
  getSalaryStructures,
  getSalaryStructureById,
  updateSalaryStructure
} = require("../controllers/salaryStructure.controller");

const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post(
  "/",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  createSalaryStructure
);

router.get(
  "/",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  getSalaryStructures
);

router.get(
  "/:id",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  getSalaryStructureById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  updateSalaryStructure
);

module.exports = router;
