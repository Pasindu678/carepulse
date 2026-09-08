# CarePulse (CareCircle) — Eldercare Monitoring & Smart Medicine Wristband

An end-to-end Eldercare Telemetry and Smart Medicine Wristband Web Application designed to protect, monitor, and connect elders with their family care network in real time.

Built with modern **React + Tailwind CSS** frontend (configured for **Netlify**) and a lightweight, high-performance **Node.js Express** backend API (configured for **Render**).

---

## 📸 Implemented Screens & Feature Workflows

Faithfully designed according to official CareCircle eldcare monitoring UI mockups:

1. **01 SECURE ACCESS (`/login`)**
   - Branded badge `01 SECURE ACCESS` and interlocking CareCircle brandmark.
   - `• Protected & encrypted` security indicator.
   - Center glassmorphic card with shield icon, DM Serif heading, username and password inputs with password reveal toggle.
   - HIPAA-conscious compliance notices and 24/7 care support links.

2. **02 MEMBER SETUP & PAIRING (`/setup`)**
   - Header progress stepper: `1 Profile` → `2 Device` → `3 Complete`.
   - **Elderly Profile Card**: Full Name (Robert S. / Mrs. Nirmala Perera), Date of Birth, Gender, Emergency Contact, Medical Notes & Allergies.
   - **Link Watch & Devices Card**: Unique MAC address pairing (`00:18:44:11:3A:B7`) with interactive BLE scan simulation.
   - Visual device confirmation banner: `Device Found: CareCircle Smart Watch (MAC: 00:18:44:11:3A:B7) — Connected Successfully!`.
   - Dynamic activation of `Save & Continue to Dashboard →`.

3. **04 EVERYDAY DASHBOARD (`/dashboard`)**
   - **Sidebar Navigation**: Dashboard (Active), Health Overview, Location, Alerts (with dynamic counter), Caregivers, Settings, and interactive `Healthy Parents Happier Tomorrows` affirmation card.
   - **Elderly Patient Profile**: Mrs. Nirmala Perera, Age 72, Gampaha, Sri Lanka with live `• Safe & Active` status and smart watch connection & battery indicator (`🔋 78%`).
   - **4 Live Vitals Cards**:
     - Heart Rate (`72 bpm`) with animated real-time green/teal ECG pulse waveform.
     - Body Temperature (`36.6 °C`) with smooth blue wave.
     - SpO2 Oxygen (`98 %`) with smooth purple wave.
     - Steps Today (`2,341`) with amber activity bar chart.
   - **Current Location Card**: Stylized interactive Sri Lanka Gampaha map with live pin and expand modal.
   - **Recent Activity Timeline**: Color-coded events for Fall Detection, Medication Reminders, Normal Heart Rate, Morning Walk, and Sleep.
   - **Recent Alerts Widget**: Interactive alerts with one-click resolution and "Acknowledge & Mark Safe" workflow.
   - **Quick Contact System**: High-definition Call, Video Call check-in, and Text-to-Speech audio message transmission to wristband speaker.
   - **Health Summary Chart**: 7-day trend graph (Mon–Sun).
   - **Hardware Wristband Simulator Drawer**: Floating interactive control widget to simulate falls, medicine alarms, step increments, and vital changes on the fly!

---

## 🚀 Deployment Instructions

### 1. Deploy Frontend to Netlify

The repository includes pre-configured `netlify.toml` files for automatic builds and SPA route handling:

1. Push this repository to your GitHub account: `https://github.com/Pasindu678/carepulse.git`.
2. Go to [Netlify](https://app.netlify.com) and click **"Add new site"** → **"Import an existing project"**.
3. Select **GitHub** and authorize your repository `Pasindu678/carepulse`.
4. Configure site settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
5. (Optional) Set environment variable:
   - `VITE_API_URL`: URL of your deployed Render backend (e.g. `https://carepulse-backend.onrender.com/api`)
6. Click **Deploy Site**. Netlify will build and deploy your site with global CDN and automatic HTTPS!

---

### 2. Deploy Backend to Render

The repository contains `render.yaml` infrastructure-as-code configuration for 1-click deployment:

1. Sign in to [Render](https://render.com).
2. Click **"New +"** → **"Web Service"** (or **"Blueprint"**).
3. Connect your repository `https://github.com/Pasindu678/carepulse.git`.
4. Configure service settings:
   - **Name**: `carepulse-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
6. Click **Create Web Service**. Render will spin up your REST API and live Server-Sent Events telemetry endpoint!

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ and npm

### 1. Start Backend API
```bash
cd server
npm install
npm start
# API runs on http://localhost:5000
```

### 2. Start Frontend App
```bash
cd client
npm install
npm run dev
# Vite dev server runs on http://localhost:3000
```

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate caregiver |
| `GET` | `/api/patient` | Get elder profile & caregivers |
| `PUT` | `/api/patient` | Update elder care profile |
| `POST` | `/api/device/find` | BLE/WiFi discovery of MAC `00:18:44:11:3A:B7` |
| `GET` | `/api/vitals` | Fetch current HR, Temp, SpO2, and Steps |
| `POST` | `/api/vitals/simulate` | Push telemetry updates from wristband |
| `GET` | `/api/alerts` | Fetch recent alerts and timeline activity |
| `POST` | `/api/alerts/:id/resolve` | Acknowledge & clear alert |
| `GET` | `/api/stream` | Server-Sent Events stream for live band updates |
| `GET` | `/api/health` | Service health status check |

---

## 🛡️ License
MIT License. Created for the CarePulse Eldercare Monitoring Project by Pasindu Induwara.