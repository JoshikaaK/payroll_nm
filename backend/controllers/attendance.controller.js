const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// Create or Update Attendance
exports.saveAttendance = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const {
      employeeId,
      month,
      totalWorkingDays,
      presentDays,
      overtimeHours
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const lopDays = totalWorkingDays - presentDays;

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, month },
      {
        organizationId,
        employeeId,
        month,
        totalWorkingDays,
        presentDays,
        lopDays,
        overtimeHours
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Attendance saved successfully",
      data: attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance for an employee
exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      employeeId: req.params.employeeId
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attendance for payroll month
exports.getAttendanceForPayroll = async (req, res) => {
  try {
    const { month } = req.query;

    const attendance = await Attendance.find({
      organizationId: req.user.organizationId,
      month
    }).populate("employeeId");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
