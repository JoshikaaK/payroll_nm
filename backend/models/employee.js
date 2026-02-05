const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  employeeCode: {
    type: String,
    required: true,
    unique: true
  },

  department: String,
  designation: String,

  dateOfJoining: Date,

  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },

  salaryStructure: {
    basic: Number,
    hra: Number,
    allowances: Number
  },

  taxRegime: {
    type: String,
    enum: ["Old", "New"],
    default: "New"
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
