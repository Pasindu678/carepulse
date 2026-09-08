const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/stream
// Server-Sent Events endpoint for real-time telemetry from elder smart band
router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  store.addSseClient(res);

  // Send initial handshake
  res.write(`event: connected\ndata: ${JSON.stringify({ message: "CarePulse Telemetry Stream Connected", time: new Date() })}\n\n`);

  req.on("close", () => {
    store.removeSseClient(res);
  });
});

module.exports = router;
