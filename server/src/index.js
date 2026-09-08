const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const deviceRoutes = require("./routes/device");
const vitalsRoutes = require("./routes/vitals");
const alertsRoutes = require("./routes/alerts");
const streamRoutes = require("./routes/stream");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Netlify frontend, localhost, and custom domains
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/stream", streamRoutes);

// Health check endpoint for Render health monitoring
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "CarePulse Backend API",
    version: "1.0.0",
    time: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.json({
    name: "CarePulse Eldercare API",
    description: "Backend telemetry and monitoring service for CarePulse smart wristbands",
    documentation: "https://github.com/Pasindu678/carepulse",
    health: "/api/health"
  });
});

app.listen(PORT, () => {
  console.log(`CarePulse Backend Server running on port ${PORT}`);
});
