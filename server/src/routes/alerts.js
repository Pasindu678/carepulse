const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/alerts
router.get("/", (req, res) => {
  res.json({
    success: true,
    alerts: store.alerts,
    activity: store.recentActivity
  });
});

// POST /api/alerts/trigger
router.post("/trigger", (req, res) => {
  const { title, severity, type, details, color } = req.body;
  const alert = store.triggerAlert({ title, severity, type, details, color });
  res.json({ success: true, alert });
});

// POST /api/alerts/:id/resolve
router.post("/:id/resolve", (req, res) => {
  const { id } = req.params;
  const alert = store.alerts.find(a => a.id === id);
  if (alert) {
    alert.active = false;
    alert.resolvedAt = new Date().toLocaleTimeString();
    store.broadcast("alert_resolved", { id });
  }
  res.json({ success: true, message: "Alert acknowledged and resolved", alerts: store.alerts });
});

module.exports = router;
