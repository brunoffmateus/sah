import express from "express";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

const router = express.Router();

// Get all appointments from a doctor from database
router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const formatted = appointments.map((a) => ({
      id: a.id,
      date: a.date,
      time: a.time,
      name: a.Patient?.User?.username || "Unknown",
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor appointments dahsboard" });
  }
});

// Get all appointments from a patient from database
router.get("/patient/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
    const formatted = appointments.map((a) => ({
      id: a.id,
      date: a.date,
      time: a.time,
      name: a.Doctor?.User?.username || "Unknown",
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient appointments dahsboard" });
  }
});

export default router;
