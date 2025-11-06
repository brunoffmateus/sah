import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  console.log(`[${req.method}] ${req.path}`);
  res.send("DevLink API is running 🚀 with PostgreSQL");
});

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // creates tables if not exist
    console.log("Database connected & synced");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


