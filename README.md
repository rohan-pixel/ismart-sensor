
# Integer Smart Sensor 🌐


A modern **Industrial IoT dashboard** for real-time asset monitoring, predictive maintenance, and anomaly detection. Built with **React**, **MUI**, and **Redux**, featuring a clean light-gradient theme.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

---

## Demo

- **Login Page:** Desktop layout with image panel and login card  
- **Dashboard:** Asset management, real-time insights, and interactive charts  
- **My Assets:** Add/view assets with empty state handling  
- Fully responsive and mobile-friendly  

---

## Features

- ✅ **Login/Registration** with form validation (React Hook Form)  
- ✅ **Real-Time Asset Monitoring** (Redux state management)  
- ✅ **Light Gradient UI**: Clean, modern, and professional look  
- ✅ **Responsive Layouts**: Desktop and mobile-ready  
- ✅ **Reusable Components**: `CustomInput`, `CustomPassword`, `AssetCard`  

---

## Tech Stack

- **Frontend:** React, React Router DOM  
- **State Management:** Redux Toolkit  
- **UI Library:** Material-UI (MUI) + MUI Lab  
- **Icons:** MUI Icons  

---

## Folder Structure

```

src/
├─ assets/         # Images and icons
├─ Components/     # Reusable UI components
├─ Pages/          # Login, Dashboard, MyAssets, etc.
├─ Redux/          # Redux store, slices
├─ helpers/        # Utility functions/constants
├─ App.jsx
└─ index.js

````

---

## Installation

```bash
# Clone repo
git clone https://github.com/rohan-pixel/ismart-sensor.git
cd integer-smart-sensor

# Install dependencies
npm install

# Start development server
npm start
````

---

## Usage

* Navigate to `/login` to authenticate (demo login available).
* After login, access your dashboard and assets.
* Add assets via **My Assets** page using the **Add Assets** button.
* Responsive design works on desktop and mobile screens.

---

## Future Improvements

* 🔹 **Backend Integration**: Connect to real-time IoT data API
* 🔹 **Charts & Analytics**: Display historical sensor metrics
* 🔹 **Notifications & Alerts**: Real-time anomalies and events
* 🔹 **User Management**: Roles, permissions, and multi-user support
* 🔹 **Enhanced Security**: JWT auth, encryption, secure APIs

---

## License

This project is for educational/demo purposes. Modify as needed.

---

**Rohan Nigam** – crafted with care for Industrial IoT insights.

