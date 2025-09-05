


import React, { useEffect, useState } from "react";
import WeatherBackground from "./components/WeatherBackground";
import {
  convertTemperature,
  getHumidityValue,
  getVisibilityValue,
  getWindDirection,
} from "./components/Helper";
import {
  HumidityIcon,
  VisibilityIcon,
  WindIcon,
} from "./components/Icons";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");

  //  Watch city input and fetch location suggestions
  useEffect(() => {
    if (city.trim().length >= 3 && !weather) {
      const timer = setTimeout(() => fetchSuggestions(city), 500);
      return () => clearTimeout(timer);
    }
    setSuggestion([]);
  }, [city, weather]);

  //  Fetch location suggestions from Open-Meteo Geocoding API
  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=5`
      );
      const json = await res.json();
      setSuggestion(json.results || []);
    } catch {
      setSuggestion([]);
    }
  };

  //  Fetch current weather from Open-Meteo Forecast API
  const fetchWeatherData = async (lat, lon, displayName = "") => {
    setError("");
    setWeather(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weathercode&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data);
      setCity(displayName);
      setSuggestion([]);
    } catch (err) {
      setError(err.message);
    }
  };

  //  Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return setError("Please enter a valid city name.");
    setError("Please select a suggestion from the list."); // force user to pick
  };

  // 🔹 Extract condition for background
  const getWeatherCondition = () =>
    weather && {
      main: weather.current.weathercode, // numeric weather code
      isDay: true, // Open-Meteo doesn't provide sunrise/sunset easily
    };

  return (
    <div className="min-h-screen">
      <WeatherBackground condition={getWeatherCondition()} />

      <div className="flex items-center justify-center p-6 min-h-screen">
        <div className="bg-transparent backdrop-filter backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md text-white w-full border border-white/30 relative z-10">
          <h1 className="text-4xl font-extrabold text-center mb-6">
            Weather App
          </h1>

          {!weather ? (
            <form onSubmit={handleSearch} className="flex flex-col relative">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter City or Country (min 3 letters)"
                className="mb-4 p-3 rounded border border-white bg-transparent text-white placeholder-white focus:outline-none focus:border-blue-300 transition duration-300"
              />
              {suggestion.length > 0 && (
                <div className="absolute top-14 left-0 right-0 bg-black/40 shadow-md rounded z-20 border border-white/20">
                  {suggestion.map((s) => (
                    <button
                      type="button"
                      key={`${s.latitude}-${s.longitude}`}
                      onClick={() =>
                        fetchWeatherData(
                          s.latitude,
                          s.longitude,
                          `${s.name}, ${s.country}${
                            s.admin1 ? `, ${s.admin1}` : ""
                          }`
                        )
                      }
                      className="block hover:bg-blue-700 bg-transparent px-4 py-2 text-sm text-left w-full transition-colors"
                    >
                      {s.name}, {s.country}
                      {s.admin1 && `, ${s.admin1}`}
                    </button>
                  ))}
                </div>
              )}
              <button
                type="submit"
                className="bg-purple-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Get Weather
              </button>
            </form>
          ) : (
            <div className="mt-6 text-center transition-opacity duration-500">
              <button
                onClick={() => {
                  setWeather(null);
                  setCity("");
                }}
                className="mb-4 bg-purple-900 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-colors"
              >
                New Search
              </button>

              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{city}</h2>
                <button
                  onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-1 px-3 rounded transition-colors"
                >
                  &deg;{unit}
                </button>
              </div>

              {/* Weather display */}
              <p className="text-4xl my-4">
                {convertTemperature(weather.current.temperature_2m, unit)}°{unit}
              </p>
              <p className="capitalize">
                Weather Code: {weather.current.weathercode}
              </p>

              <div className="flex flex-wrap justify-around mt-6">
                {[
                  [
                    HumidityIcon,
                    "Humidity",
                    `${weather.current.relative_humidity_2m}% (${getHumidityValue(
                      weather.current.relative_humidity_2m
                    )})`,
                  ],
                  [
                    WindIcon,
                    "Wind",
                    `${weather.current.windspeed_10m} m/s`,
                  ],
                  [
                    VisibilityIcon,
                    "Visibility",
                    getVisibilityValue(10000), // Open-Meteo has no visibility in current
                  ],
                ].map(([Icon, label, value]) => (
                  <div
                    key={label}
                    className="flex flex-col items-center m-2 bg-black/20 px-4 py-3 rounded-lg transform transition-all duration-200 hover:scale-105 hover:bg-purple-900 "
                  >
                    <Icon />
                    <p className="mt-1 font-semibold">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;









