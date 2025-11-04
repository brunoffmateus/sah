import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Patients from "./Patient.js";
import Doctors from "./Doctor.js";

const Appointment = sequelize.define("Appointment", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("scheduled", "completed", "canceled"),
    defaultValue: "scheduled",
  },
});

// Associations
Patients.hasMany(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(Patients, { foreignKey: "patientId" });

Doctors.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctors, { foreignKey: "doctorId" });

export default Appointment;
