const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Organization = require("../models/organization");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      organizationId: user.organizationId
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Register Organization + Super Admin
exports.register = async (req, res) => {
  try {
    const { orgName, address, country, state, name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const organization = await Organization.create({
      name: orgName,
      address,
      country,
      state
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "SuperAdmin",
      organizationId: organization._id
    });

    res.status(201).json({
      message: "Organization registered successfully",
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Logged-in User
exports.getProfile = async (req, res) => {
  res.json(req.user);
};
