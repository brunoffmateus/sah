import express from "express";
import Appointment from "../models/Appointment.js";
import Patients from "../models/Patient.js";
import Doctors from "../models/Doctor.js";
import authDoc from "../middleware/auth.js";

const router = express.Router();

// READ all
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [Patients, Doctors],
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// CREATE
router.post("/create", authDoc, async (req, res) => {
  try {
    // req.user.id comes from JWT payload
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(403).json({ message: "Only doctors can create an appointment" });

    const { patientId, date } = req.body;
    const appointment = await Appointment.create({
      patientId,
      doctorId: doctor.id,
      date,
    });
    res.json(appointment);
    res.json({ message: "Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating appointment" });
  }
});

// UPDATE
router.put("/update", authDoc, async (req, res) => {
  try {
    const { status } = req.body;
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(403).json({ message: "Only doctors can update an appointment" });

    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating appointment" });
  }
});

// DELETE
router.delete("/read", authDoc, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    if (!doctor) return res.status(403).json({ message: "Only doctors can delete an appointment" });

    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    await appointment.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting appointment" });
  }
});

export default router;
