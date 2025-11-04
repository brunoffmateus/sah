import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js"

const Patient = sequelize.define("Patient", {
  birthdate: DataTypes.DATE,
  address: DataTypes.STRING,
});

// Associations
User.hasOne(Patient, { foreignKey: "userId" }); //  Users.id <== Patients.userId
Patient.belongsTo(User, { foreignKey: "userId" });

export default Patient;
