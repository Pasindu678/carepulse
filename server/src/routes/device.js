const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/device/status
router.get("/status", (req, res) => {
  res.json({
    success: true,
    device: store.device
  });
});

// POST /api/device/find
// Simulates BLE / WiFi discovery of the elder smart wristband by MAC address
router.post("/find", (req, res) => {
  const { mac } = req.body;
  const targetMac = mac ? mac.trim().toUpperCase() : "";

  // Support the MAC in the screenshot: 00:18:44:11:3A:B7 or any valid MAC format
  if (targetMac === "00:18:44:11:3A:B7" || targetMac.length >= 10) {
    store.device.mac = targetMac || "00:18:44:11:3A:B7";
    store.device.isPaired = true;
    store.device.status = "Connected";
    store.device.lastSync = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return res.json({
      success: true,
      found: true,
      device: {
        name: "CareCircle Smart Watch",
        model: "CarePulse Band V3",
        mac: store.device.mac,
        battery: store.device.battery,
        signalStrength: "-42 dBm (Excellent)",
        firmware: "v2.1.4-secure"
      },
      message: `Device Found: CareCircle Smart Watch (MAC: ${store.device.mac}) — Connected Successfully!`
    });
  }

  res.status(404).json({
    success: false,
    found: false,
    message: "No CareCircle wristband device found with that MAC address."
  });
});

// POST /api/device/update-battery
router.post("/battery", (req, res) => {
  const { battery } = req.body;
  if (typeof battery === "number") {
    store.device.battery = Math.min(100, Math.max(0, battery));
    store.broadcast("device_updated", store.device);
  }
  res.json({ success: true, device: store.device });
});

module.exports = router;
