const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/vitals
router.get("/", (req, res) => {
  res.json({
    success: true,
    vitals: store.vitals,
    lastSync: store.device.lastSync
  });
});

// GET /api/vitals/summary
router.get("/summary", (req, res) => {
  res.json({
    success: true,
    weekly: store.healthSummary
  });
});

// POST /api/vitals/simulate
// Update or simulate real-time wristband metrics
router.post("/simulate", (req, res) => {
  const { heartRate, temperature, spO2, steps } = req.body;

  if (heartRate !== undefined) {
    store.vitals.heartRate.value = heartRate;
    store.vitals.heartRate.history.push(heartRate);
    if (store.vitals.heartRate.history.length > 12) store.vitals.heartRate.history.shift();
    store.vitals.heartRate.status = heartRate > 100 ? "High" : heartRate < 60 ? "Low" : "Normal";
  }

  if (temperature !== undefined) {
    store.vitals.temperature.value = temperature;
    store.vitals.temperature.history.push(temperature);
    if (store.vitals.temperature.history.length > 12) store.vitals.temperature.history.shift();
    store.vitals.temperature.status = temperature > 37.5 ? "Fever" : "Normal";
  }

  if (spO2 !== undefined) {
    store.vitals.spO2.value = spO2;
    store.vitals.spO2.history.push(spO2);
    if (store.vitals.spO2.history.length > 12) store.vitals.spO2.history.shift();
    store.vitals.spO2.status = spO2 < 95 ? "Warning" : "Normal";
  }

  if (steps !== undefined) {
    store.vitals.steps.value = steps;
  }

  const updated = store.updateVitals(store.vitals);

  res.json({
    success: true,
    vitals: updated,
    message: "Wristband vitals updated"
  });
});

module.exports = router;
