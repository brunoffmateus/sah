import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Appointment from "./Appointment.js";

const MedicalRecords = sequelize.define("MedicalRecords", {
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
MedicalRecords.hasMany(Appointment, { foreignKey: "appointmentId" });
Appointment.belongsTo(MedicalRecords, { foreignKey: "appointmentId" });

export default MedicalRecords;
