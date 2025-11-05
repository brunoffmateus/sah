import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import sequelize from "../config/db.js";

const router = express.Router();

// Register Patient
router.post("/register/patient", async (req, res) => {
  try {
    const { username, password, name, birthdate, address } = req.body;

    // basic validation
    if (!username || !password || !name) {
      return res.status(400).json({
        message: "Missing one of the required fields: username, password, name"
      });
    }

    // Check if user already exists
    const userFound = await User.findOne({ where: { username } });
    if (userFound) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and patient in the same trasaction
    const transaction = await sequelize.transaction();
    const user = await User.create(
      { username, name, password: hashedPassword },
      { transaction }
    );
    await Patient.create(
      {
        userId: user.id,
        birthdate:
          birthdate && !isNaN(Date.parse(birthdate)) ? new Date(birthdate) : null,
        address: address || null
      },
      { transaction }
    );
    await transaction.commit();

    res.status(201).json({ message: "Patient registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Register Doctor
router.post("/register/doctor", async (req, res) => {
  try {
    const { username, password, name, specialty, room } = req.body;

    // basic validation
    if (!username || !password || !name) {
      return res.status(400).json({
        message: "Missing one of the required fields: username, password, name"
      });
    }

    // Check if user already exists
    const userFound = await User.findOne({ where: { username } });
    if (userFound) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and doctor in the same trasaction
    const transaction = await sequelize.transaction();
    const user = await User.create(
      { username, name, password: hashedPassword },
      { transaction }
    );
    await Doctor.create(
      { userId: user.id, specialty: specialty || null, room },
      { transaction }
    );
    await transaction.commit();

    res.status(201).json({ message: "Doctor registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const userFound = await User.findOne({ where: { username } });
    if (!userFound) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Find username
    const user = await User.findOne({ where: { username } });

    if (typeof (password) !== String && !bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
