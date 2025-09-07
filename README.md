# 🌦 Weather Now  

🔗 *Live Demo:* [Weather Now Hosted App]-> https://shiny-treacle-ae2dc8.netlify.app/

A modern, dynamic weather application built with *React + Vite* and styled using *Tailwind CSS*.  
The app fetches real-time weather data using the **[Open-Meteo API](https://open-meteo.com/)** and displays it with a glassmorphic UI.  

---

## 🚀 Features  
- 🌍 Search weather by city (auto-suggestions from Open-Meteo Geocoding API)  
- 🌤 Real-time weather data (temperature, humidity, wind, visibility)  
- 🎨 Glassmorphism UI with dynamic backgrounds (GIFs / video)  
- 🌡 Temperature unit toggle (°C / °F)  
- 📱 Fully responsive design  

---

## 🛠 Tech Stack  

*Languages & Frameworks:*  
- ⚛ React (with Vite)  
- 🎨 Tailwind CSS  
- 📜 JavaScript (ES6+)  

*APIs Used:*  
- 🌐 [Open-Meteo Weather API](https://open-meteo.com/)  
- 🗺 [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)  

---

## 📂 Project Structure  

```bash
weather-now/
│
├── public/                 # Static files
├── src/
│   ├── assets/             # Images, gifs, video backgrounds
│   ├── components/         # Reusable UI components
│   │   ├── WeatherBackground.jsx
│   │   ├── Icons.jsx
│   │   └── Helper.js
│   ├── App.jsx             # Main app logic
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md 
