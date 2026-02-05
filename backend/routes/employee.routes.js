const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee
} = require("../controllers/employee.controller");

const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post(
  "/",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  createEmployee
);

router.get(
  "/",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  getEmployees
);

router.get(
  "/:id",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  getEmployeeById
);

router.put(
  "/:id",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  updateEmployee
);

module.exports = router;
