const mongoose = require("mongoose");

const taxSlabSchema = new mongoose.Schema({
  minIncome: Number,
  maxIncome: Number,
  taxRate: Number
});

const statutoryConfigSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  country: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  pf: {
    enabled: Boolean,
    employeeContribution: Number,
    employerContribution: Number
  },

  esi: {
    enabled: Boolean,
    employeeContribution: Number,
    employerContribution: Number,
    salaryLimit: Number
  },

  professionalTax: {
    enabled: Boolean,
    monthlyAmount: Number
  },

  taxSlabs: [taxSlabSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("StatutoryConfig", statutoryConfigSchema);
