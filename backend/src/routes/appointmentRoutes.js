import express from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// Get all doctors from database
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: {
        model: User,
        name: "name", // pull doctor's name from Users table
      },
      id: "userId",
    });
    const formatted = doctors.map(doc => ({
      id: doc.id,
      name: doc.User.name,
    }));
    console.log("Doctors:", formatted);
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});

// Book appointment
router.post("/book", async (req, res) => {
  try {
    const { username, doctorId, date, time } = req.body;
    if (!username || !doctorId || !date || !time) {
      return res.status(400).json({
        message: "Missing one of the required fields: username, doctorId, date, time"
      });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const parsedDoctorId = parseInt(doctorId, 10);

    const appointment = await Appointment.findOne({
      where: {
        doctorId: parsedDoctorId,
        date,
        time,
      },
    });
    if (appointment) {
      return res.status(400).json({ message: "This time slot is already booked for the selected doctor" });
    }

    await Appointment.create({
      date,
      time,
      patientId: user.id,
      doctorId: parsedDoctorId,
    });

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error booking appointment",
      error: error.message,
      stack: error.stack,
    });
  }
});

export default router;
