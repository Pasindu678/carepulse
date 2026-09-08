const express = require("express");
const router = express.Router();
const store = require("../data/store");

// Pre-configured demo accounts
const DEMO_ACCOUNTS = {
  pasindu: {
    username: "pasindu",
    password: "carepulse123",
    name: "Pasindu Induwara",
    role: "Family Primary Caregiver",
    patient: {
      id: "p-01",
      name: "Mrs. Nirmala Perera",
      relation: "Mother",
      age: 72,
      location: "Gampaha",
      address: "Home - Gampaha, Sri Lanka",
      coordinates: { lat: 7.0840, lng: 79.9937 },
      status: "Safe & Active",
      gender: "Female",
      dob: "May 14, 1952",
      emergencyContact: "Anna Simmons (+94 77 123 4567)",
      medicalNotes: "Penicillin allergy • Hypertension"
    }
  },
  "dr.anna": {
    username: "dr.anna",
    password: "carepulse123",
    name: "Anna Simmons, RN",
    role: "Registered Eldercare Nurse",
    patient: {
      id: "p-02",
      name: "Robert S.",
      relation: "Patient",
      age: 81,
      location: "Colombo",
      address: "Senior Care Wing - Colombo, Sri Lanka",
      coordinates: { lat: 6.9271, lng: 79.8612 },
      status: "Safe & Active",
      gender: "Male",
      dob: "May 14, 1943",
      emergencyContact: "Pasindu Induwara (+94 77 987 6543)",
      medicalNotes: "Aspirin daily • Diabetic Monitoring"
    }
  }
};

// In-memory dynamic users store for newly registered accounts
const registeredUsers = {};

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Please enter both username and password" });
  }

  const normalizedUser = username.trim().toLowerCase();

  // Check demo accounts
  if (DEMO_ACCOUNTS[normalizedUser]) {
    const acc = DEMO_ACCOUNTS[normalizedUser];
    if (password === acc.password || password === "carepulse123" || password === "demo") {
      store.patient = acc.patient;
      return res.json({
        success: true,
        user: {
          username: acc.username,
          name: acc.name,
          role: acc.role,
          token: "carepulse-token-" + Date.now()
        },
        patient: acc.patient,
        message: `Welcome back, ${acc.name}!`
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid password for demo account. Use: carepulse123" });
    }
  }

  // Check registered users
  if (registeredUsers[normalizedUser]) {
    const user = registeredUsers[normalizedUser];
    if (user.password === password) {
      return res.json({
        success: true,
        user: {
          username: user.username,
          name: user.name,
          role: user.role,
          token: "carepulse-token-" + Date.now()
        },
        patient: user.patient || store.patient,
        message: `Welcome back, ${user.name}!`
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }
  }

  // Allow open sign-in for any new name during live demonstrations
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  return res.json({
    success: true,
    user: {
      username: normalizedUser,
      name: displayName,
      role: "Family Caregiver",
      token: "carepulse-token-" + Date.now()
    },
    patient: store.patient,
    message: `Signed in as ${displayName}`
  });
});

// POST /api/auth/register
router.post("/register", (req, res) => {
  const { username, password, name, role, patientName, patientRelation } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  const normalizedUser = username.trim().toLowerCase();
  
  if (DEMO_ACCOUNTS[normalizedUser] || registeredUsers[normalizedUser]) {
    return res.status(400).json({ success: false, message: "Username already exists. Please pick another." });
  }

  const newUser = {
    username: normalizedUser,
    password: password,
    name: name || username,
    role: role || "Primary Caregiver",
    patient: {
      id: "p-" + Date.now(),
      name: patientName || "Elder Family Member",
      relation: patientRelation || "Parent",
      age: 72,
      location: "Gampaha",
      address: "Home - Gampaha, Sri Lanka",
      status: "Safe & Active",
      gender: "Female",
      dob: "May 14, 1952",
      emergencyContact: `${name || username}`,
      medicalNotes: "General Eldercare Monitoring"
    }
  };

  registeredUsers[normalizedUser] = newUser;
  store.patient = newUser.patient;

  res.json({
    success: true,
    user: {
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      token: "carepulse-token-" + Date.now()
    },
    patient: newUser.patient,
    message: "CarePulse account registered successfully!"
  });
});

// GET /api/auth/demo-accounts
router.get("/demo-accounts", (req, res) => {
  res.json({
    success: true,
    accounts: [
      {
        username: "pasindu",
        password: "carepulse123",
        name: "Pasindu Induwara",
        role: "Primary Caregiver",
        patientName: "Mrs. Nirmala Perera"
      },
      {
        username: "dr.anna",
        password: "carepulse123",
        name: "Anna Simmons, RN",
        role: "Registered Nurse",
        patientName: "Robert S."
      }
    ]
  });
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  res.json({ success: true, user: store.user });
});

module.exports = router;