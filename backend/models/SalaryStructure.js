const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  percentageOfBasic: Number
});

const salaryStructureSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  structureName: {
    type: String,
    required: true
  },

  basic: {
    type: Number,
    required: true
  },

  earnings: [componentSchema],

  deductions: [componentSchema],

  grossSalary: Number,
  netSalary: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SalaryStructure", salaryStructureSchema);
