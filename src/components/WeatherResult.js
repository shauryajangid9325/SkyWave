import React, { useState, useEffect } from "react";

const WeatherResult = ({ city, trigger, useCoordinates, coordinates }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      let apiUrl;
      if (useCoordinates && coordinates.latitude && coordinates.longitude) {
        apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true`;
      } else if (city.trim()) {
        // Forward geocode city name to coordinates then fetch weather
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );
        if (!geoRes.ok) throw new Error("Failed to fetch coordinates for city");
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) throw new Error("City not found");
        const { latitude, longitude } = geoData.results[0];
        apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      } else {
        throw new Error("Invalid input for weather fetch");
      }

      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      if (!data.current_weather) throw new Error("No current weather data found");
      setWeatherData(data.current_weather);
    } catch (err) {
      setError(err.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [trigger]);

  return (
    <div className="mt-4 pb-4 md:px-4 px-2 rounded-lg text-gray-900">
      <h2 className="md:text-2xl font-bold mb-2">
        🌤️ Weather at <span className="italic">{useCoordinates ? "Current Location" : city}</span>:
      </h2>

      {loading && <p className="text-yellow-800">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {weatherData && (
        <div className="mt-2 md:text-white text-gray-800 font-semibold space-y-2">
          <p>🌡️ Temperature: {weatherData.temperature}°C</p>
          <p>💨 Wind Speed: {weatherData.windspeed} km/h</p>
          <p>🧭 Wind Direction: {weatherData.winddirection}°</p>
          <p>⏱️ Time: {new Date(weatherData.time).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherResult;
