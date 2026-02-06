const express = require("express");
const router = express.Router();

const {
  saveAttendance,
  getAttendanceByEmployee,
  getAttendanceForPayroll
} = require("../controllers/attendance.controller");

const protect = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post(
  "/",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  saveAttendance
);

router.get(
  "/employee/:employeeId",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  getAttendanceByEmployee
);

router.get(
  "/",
  protect,
  authorizeRoles("HR", "PayrollAdmin", "SuperAdmin"),
  getAttendanceForPayroll
);

module.exports = router;
