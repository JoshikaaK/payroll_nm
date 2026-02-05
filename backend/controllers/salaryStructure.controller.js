const SalaryStructure = require("../models/SalaryStructure");

// Helper to calculate totals
const calculateTotals = (basic, earnings, deductions) => {
  const earningsTotal = earnings.reduce((sum, e) => sum + (e.amount || 0), 0);
  const deductionsTotal = deductions.reduce((sum, d) => sum + (d.amount || 0), 0);

  const grossSalary = basic + earningsTotal;
  const netSalary = grossSalary - deductionsTotal;

  return { grossSalary, netSalary };
};

// Create Salary Structure
exports.createSalaryStructure = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const { structureName, basic, earnings, deductions } = req.body;

    const { grossSalary, netSalary } = calculateTotals(
      basic,
      earnings || [],
      deductions || []
    );

    const structure = await SalaryStructure.create({
      organizationId,
      structureName,
      basic,
      earnings,
      deductions,
      grossSalary,
      netSalary
    });

    res.status(201).json({
      message: "Salary structure created",
      data: structure
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all salary structures
exports.getSalaryStructures = async (req, res) => {
  try {
    const structures = await SalaryStructure.find({
      organizationId: req.user.organizationId
    });

    res.json(structures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single salary structure
exports.getSalaryStructureById = async (req, res) => {
  try {
    const structure = await SalaryStructure.findById(req.params.id);
    if (!structure)
      return res.status(404).json({ message: "Salary structure not found" });

    res.json(structure);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update salary structure
exports.updateSalaryStructure = async (req, res) => {
  try {
    const { basic, earnings, deductions } = req.body;

    const { grossSalary, netSalary } = calculateTotals(
      basic,
      earnings || [],
      deductions || []
    );

    const updated = await SalaryStructure.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        grossSalary,
        netSalary
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Salary structure not found" });

    res.json({
      message: "Salary structure updated",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
