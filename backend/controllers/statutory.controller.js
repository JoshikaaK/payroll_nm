const StatutoryConfig = require("../models/statutoryConfig");

// Create / Update statutory configuration
exports.saveStatutoryConfig = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const existingConfig = await StatutoryConfig.findOne({ organizationId });

    if (existingConfig) {
      const updatedConfig = await StatutoryConfig.findOneAndUpdate(
        { organizationId },
        req.body,
        { new: true }
      );
      return res.json({
        message: "Statutory configuration updated",
        data: updatedConfig
      });
    }

    const config = await StatutoryConfig.create({
      ...req.body,
      organizationId
    });

    res.status(201).json({
      message: "Statutory configuration created",
      data: config
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statutory configuration
exports.getStatutoryConfig = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const config = await StatutoryConfig.findOne({ organizationId });

    if (!config) {
      return res.status(404).json({ message: "Statutory config not found" });
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
