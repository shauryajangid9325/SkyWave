import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";

const Forecast = () => {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [tempAlert, setTempAlert] = useState("");
  const [showCards, setShowCards] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [useCoordinates, setUseCoordinates] = useState(false);

  const showTempAlert = (msg) => {
    setTempAlert(msg);
    setTimeout(() => setTempAlert(""), 2000);
  };

  const fetchForecast = async (lat, lon) => {
    try {
      setIsLoading(true);
      showTempAlert("Fetching forecast for your location...");

      const forecastRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );

      const days = forecastRes.data.daily;
      const result = [];

      for (let i = 0; i < 5; i++) {
        result.push({
          date: days.time[i],
          min: days.temperature_2m_min[i],
          max: days.temperature_2m_max[i],
          code: days.weathercode[i],
        });
      }

      setForecastData(result);
      setShowCards(true);
    } catch (err) {
      console.error(err);
      showTempAlert("Failed to fetch forecast.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      showTempAlert("Please enter a city name.");
      return;
    }

    try {
      showTempAlert(`Searching forecast for ${city}...`);

      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      if (!geoRes.data?.results?.length) {
        showTempAlert("City not found.");
        return;
      }

      const { latitude, longitude } = geoRes.data.results[0];
      setCoordinates({ latitude, longitude });
      setUseCoordinates(false);

      await fetchForecast(latitude, longitude);
    } catch (err) {
      console.error(err);
      showTempAlert("Failed to fetch forecast.");
    }
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      showTempAlert("Geolocation is not supported by your browser.");
      return;
    }

    showTempAlert("Getting your location...");
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        setUseCoordinates(true);
        setCity(""); // Clear city input when using coordinates

        fetchForecast(latitude, longitude);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            showTempAlert("Location access denied. Please allow location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            showTempAlert("Location information unavailable.");
            break;
          case error.TIMEOUT:
            showTempAlert("Location request timed out.");
            break;
          default:
            showTempAlert("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    // When city changes, reset cards
    setShowCards(false);
  }, [city]);

  return (
    <div
      className={`relative text-white px-4 pb-24 ${
        showCards ? "min-h-screen" : "h-screen"
      }
      bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')]
      bg-cover bg-center bg-no-repeat bg-fixed md:bg-none`}
    >
      {/* Alert */}
      {tempAlert && (
        <div className="fixed top-[62px] md:top-16 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white font-semibold px-6 py-3 shadow-lg z-50 w-full text-center whitespace-nowrap">
          {tempAlert}
        </div>
      )}

      {/* Center Content Wrapper */}
      <div
        className={`flex items-center justify-center ${
          showCards ? "min-h-[calc(100vh-65px)]" : "h-screen"
        }`}
      >
        <div className="flex flex-col items-center w-full">
          <div
            className={`w-[90%] md:max-w-3xl text-center bg-white/20 backdrop-blur-md rounded-xl py-10 md:px-8 px-6 shadow-lg transition-all duration-300 ${
              showCards ? "mt-[100px] md:mt-0" : "mt-0"
            }`}
          >
            <h1 className="md:items-center md:gap-5 gap-2 md:justify-center md:mb-10 flex md:text-4xl font-semibold md:text-transparent ">
              <div className="text-sm sm:text-lg md:text-3xl text-black font-semibold">📈</div>
              <div className="text-sm sm:text-lg md:text-3xl text-black italic font-bold">
                Forecast Your Favourite City Now!
              </div>
            </h1>
            <div className="flex flex-col md:flex-row gap-4 items-center ">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-4 py-2 mt-3 md:mt-0 rounded-md bg-gray-100 text-gray-800 outline-none shadow-sm h-full"
              />
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold px-4 py-1 rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition duration-300 h-full"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔍</span>
                  <span>Check</span>
                </span>
              </button>
            </div>

            <div className="h-0.5 md:w-2/3 mx-auto bg-black rounded-full my-8"></div>


            {/* Use Current Location Button */}
            <div className="mt-4">
              <button
                onClick={handleGeoLocation}
                disabled={isLoading}
                className="bg-gray-800 shadow-2xl text-gray-50 md:font-bold md:px-6 px-3 md:py-3 py-1.5 rounded-full hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "📍 Getting Location..." : "📍 Use Current Location"}
              </button>
            </div>
          </div>

          {/* Forecast Cards */}
          {showCards && (
            <div className="w-[90%] mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecastData.map((day, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center shadow-md flex flex-col items-center"
                >
                  <p className="text-sm text-black md:text-white font-semibold">
                    {new Date(day.date).toDateString()}
                  </p>
                  <p className="text-lg font-bold text-gray-700 md:text-white mt-2">
                    🌡️ {day.min}°C - {day.max}°C
                  </p>
                  <p className="mt-2 text-black md:text-white">📍 Code: {day.code}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Forecast;
