// In-memory data store for CarePulse / CareCircle Eldercare Monitoring System
class DataStore {
  constructor() {
    this.user = {
      username: "pasindu",
      name: "Pasindu Induwara",
      role: "Family Primary Caregiver",
      email: "pasindu@carepulse.app",
      token: "demo-carepulse-session-token-12345"
    };

    this.patient = {
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
    };

    this.device = {
      mac: "00:18:44:11:3A:B7",
      name: "CareCircle Band",
      model: "CarePulse HealthWatch Pro X",
      status: "Connected",
      battery: 78,
      isPaired: true,
      lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.vitals = {
      heartRate: {
        value: 72,
        unit: "bpm",
        status: "Normal",
        history: [68, 70, 74, 72, 71, 75, 72, 73, 72]
      },
      temperature: {
        value: 36.6,
        unit: "°C",
        status: "Normal",
        history: [36.4, 36.5, 36.6, 36.7, 36.6, 36.6]
      },
      spO2: {
        value: 98,
        unit: "%",
        status: "Normal",
        history: [97, 98, 98, 99, 98, 98]
      },
      steps: {
        value: 2341,
        target: 4000,
        status: "Normal",
        hourly: [120, 240, 480, 850, 1340, 1890, 2341]
      }
    };

    this.recentActivity = [
      {
        id: "act-1",
        time: "10:24 AM",
        title: "Fall detected",
        desc: "Help is on the way",
        type: "fall",
        color: "#EF4444"
      },
      {
        id: "act-2",
        time: "08:00 AM",
        title: "Medication reminder",
        desc: "Take your medicine",
        type: "medication",
        color: "#3B82F6"
      },
      {
        id: "act-3",
        time: "07:15 AM",
        title: "Heart rate normal",
        desc: "72 bpm",
        type: "vitals",
        color: "#10B981"
      },
      {
        id: "act-4",
        time: "06:42 AM",
        title: "Morning walk",
        desc: "356 steps",
        type: "activity",
        color: "#F59E0B"
      },
      {
        id: "act-5",
        time: "05:30 AM",
        title: "Sleep",
        desc: "6h 45m",
        type: "sleep",
        color: "#8B5CF6"
      }
    ];

    this.alerts = [
      {
        id: "alt-1",
        title: "Fall Detected",
        timestamp: "2 hours ago • 10:24 AM",
        time: "10:24 AM",
        severity: "critical",
        type: "fall",
        color: "#F97316",
        active: true,
        details: "Rapid acceleration downward followed by sudden stop. Automated emergency beacon dispatched."
      },
      {
        id: "alt-2",
        title: "Medication Reminder",
        timestamp: "2 hours ago • 08:00 AM",
        time: "08:00 AM",
        severity: "routine",
        type: "medication",
        color: "#3B82F6",
        active: true,
        details: "Morning dose of Amlodipine 5mg due with glass of water."
      }
    ];

    this.healthSummary = [
      { day: "Mon", score: 85, hr: 71, steps: 2800 },
      { day: "Tue", score: 92, hr: 73, steps: 3200 },
      { day: "Wed", score: 88, hr: 70, steps: 2900 },
      { day: "Thu", score: 90, hr: 72, steps: 3100 },
      { day: "Fri", score: 95, hr: 69, steps: 3850 },
      { day: "Sat", score: 89, hr: 74, steps: 2400 },
      { day: "Sun", score: 94, hr: 72, steps: 3150 }
    ];

    this.caregivers = [
      {
        id: "cg-1",
        name: "Pasindu Induwara",
        relation: "Son (Primary)",
        phone: "+94 77 123 4567",
        status: "Active"
      },
      {
        id: "cg-2",
        name: "Anna Simmons",
        relation: "Registered Eldercare Nurse",
        phone: "+94 71 888 9999",
        status: "On Call"
      }
    ];

    this.sseClients = [];
  }

  // Subscribe SSE client
  addSseClient(client) {
    this.sseClients.push(client);
  }

  removeSseClient(client) {
    this.sseClients = this.sseClients.filter(c => c !== client);
  }

  // Broadcast state changes in real time
  broadcast(event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    this.sseClients.forEach(client => {
      try {
        client.write(payload);
      } catch (err) {
        // Client disconnected
      }
    });
  }

  // Simulate or update vitals from wristband
  updateVitals(newVitals) {
    this.vitals = { ...this.vitals, ...newVitals };
    this.device.lastSync = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.broadcast('vitals_update', this.vitals);
    return this.vitals;
  }

  // Trigger new alert from smart band
  triggerAlert(alertData) {
    const newAlert = {
      id: `alt-${Date.now()}`,
      title: alertData.title || "Wristband Alert",
      timestamp: "Just now",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      severity: alertData.severity || "high",
      type: alertData.type || "alert",
      color: alertData.color || "#EF4444",
      active: true,
      details: alertData.details || "Telemetry threshold triggered on smart medicine band."
    };
    this.alerts.unshift(newAlert);
    
    // Also prepend to recent activity
    this.recentActivity.unshift({
      id: `act-${Date.now()}`,
      time: newAlert.time,
      title: newAlert.title,
      desc: newAlert.details,
      type: newAlert.type,
      color: newAlert.color
    });

    this.broadcast('new_alert', newAlert);
    return newAlert;
  }
}

const store = new DataStore();
module.exports = store;
