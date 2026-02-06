const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  month: {
    type: String, // YYYY-MM
    required: true
  },

  totalWorkingDays: {
    type: Number,
    required: true
  },

  presentDays: {
    type: Number,
    required: true
  },

  lopDays: {
    type: Number,
    default: 0
  },

  overtimeHours: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

attendanceSchema.index({ employeeId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
