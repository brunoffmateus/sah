import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js"

const Doctor = sequelize.define("Doctor", {
  specialty: DataTypes.STRING,
  room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
User.hasOne(Doctor, { foreignKey: "userId" });
Doctor.belongsTo(User, { foreignKey: "userId" });

export default Doctor;
