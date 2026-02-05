const Employee = require("../models/employee");
const User = require("../models/user");

// Create Employee Payroll Profile
exports.createEmployee = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const {
      userId,
      employeeCode,
      department,
      designation,
      dateOfJoining,
      bankDetails,
      salaryStructure,
      taxRegime
    } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists)
      return res.status(404).json({ message: "User not found" });

    const employee = await Employee.create({
      organizationId,
      userId,
      employeeCode,
      department,
      designation,
      dateOfJoining,
      bankDetails,
      salaryStructure,
      taxRegime
    });

    res.status(201).json({
      message: "Employee payroll profile created",
      data: employee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Employees (Organization-wise)
exports.getEmployees = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const employees = await Employee.find({ organizationId })
      .populate("userId", "name email role");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Employee
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("userId", "name email");

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Employee Payroll Profile
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.json({
      message: "Employee payroll profile updated",
      data: updatedEmployee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
