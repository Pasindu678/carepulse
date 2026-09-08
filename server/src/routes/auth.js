const express = require("express");
const router = express.Router();
const store = require("../data/store");

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Demo login accept or validate
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  // Any non-empty input is accepted for seamless eldercare onboarding demo
  return res.json({
    success: true,
    user: {
      username: username,
      name: username === "pasindu" ? "Pasindu Induwara" : "Family Caregiver",
      role: "Primary Caregiver",
      token: "carepulse-jwt-token-" + Date.now()
    },
    message: "Login successful"
  });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  res.json({ success: true, user: store.user });
});

module.exports = router;
