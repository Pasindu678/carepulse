const express = require("express");
const router = express.Router();
const store = require("../data/store");

// GET /api/patient
router.get("/", (req, res) => {
  res.json({
    success: true,
    patient: store.patient,
    caregivers: store.caregivers
  });
});

// PUT /api/patient
router.put("/", (req, res) => {
  const { name, dob, gender, emergencyContact, medicalNotes, location } = req.body;
  
  if (name) store.patient.name = name;
  if (dob) store.patient.dob = dob;
  if (gender) store.patient.gender = gender;
  if (emergencyContact) store.patient.emergencyContact = emergencyContact;
  if (medicalNotes) store.patient.medicalNotes = medicalNotes;
  if (location) store.patient.location = location;

  store.broadcast("patient_updated", store.patient);

  res.json({
    success: true,
    message: "Patient profile updated successfully",
    patient: store.patient
  });
});

module.exports = router;
