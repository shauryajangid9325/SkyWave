import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import WeatherResult from "./WeatherResult";

const Home = () => {
  const [city, setCity] = useState("");
  const [tempAlert, setTempAlert] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [useCoordinates, setUseCoordinates] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const showTempAlert = (msg) => {
    setTempAlert(msg);
    setTimeout(() => setTempAlert(""), 2000);
  };

  const handleSearch = () => {
    if (!city.trim() && !useCoordinates) {
      showTempAlert("Please enter a city name.");
      return;
    }
    setShowResult(true);
    setTriggerFetch((prev) => prev + 1);
    if (useCoordinates) {
      showTempAlert("Fetching weather for your location...");
    } else {
      showTempAlert(`Fetching weather for ${city}...`);
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
        setCity(""); // Clear city name since we use coordinates
        setIsLoading(false);
        showTempAlert("Location found! Fetching weather...");
        setShowResult(true);
        setTriggerFetch((prev) => prev + 1);
      },
      (error) => {
        setIsLoading(false);
        setUseCoordinates(false);
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
    setShowResult(false);
  }, [city]);

  return (
    <div
      className={`
        relative bg-fixed bg-cover h-screen bg-center bg-no-repeat text-white
        bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')]
        md:bg-none overflow-x-hidden
      `}
    >
      {/* Alert box */}
      {tempAlert && (
        <div className="fixed top-[62px] md:top-16 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white font-semibold px-6 py-3 shadow-lg z-50 w-full text-center whitespace-nowrap">
          {tempAlert}
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-800 mt-3">Getting your location...</p>
          </div>
        </div>
      )}

      {/* Main content container with conditional scrolling */}
      <div className={`h-screen flex flex-col ${showResult ? "overflow-y-auto" : "overflow-hidden"} relative z-10 px-4`}>
        {/* Centered content */}
        <div className={`flex-grow flex flex-col items-center justify-center ${showResult ? "py-8" : ""}`}>
          {/* Input blurry box */}
          <div className="w-full max-w-3xl text-center bg-white/20 backdrop-blur-md rounded-xl py-10 md:px-8 px-6 shadow-lg mx-4">
            <h1 className="lg:text-4xl md:text-2xl text-[14px] font-bold italic text-black mb-2">
              Don't Let the Weather Surprise You !
            </h1>
            <p className="text-[11px] md:text-lg md:text-white text-gray-800 italic md:mb-6 mb-2 font-semibold">
              Check the current weather in your area now !
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setUseCoordinates(false);
                }}
                placeholder="Enter city name..."
                className="w-full px-4 py-2 mt-3 md:mt-0 rounded-md bg-gray-100 text-gray-800 outline-none shadow-sm h-full"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold px-4 py-1 rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition duration-300 h-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔍</span>
                  <span>Check</span>
                </span>
              </button>
            </div>

            <div className="h-0.5 md:w-2/3 mx-auto bg-black rounded-full my-8"></div>

            <button
              onClick={handleGeoLocation}
              disabled={isLoading}
              className="bg-gray-800 shadow-2xl text-gray-50 md:font-bold md:px-6 px-3 md:py-3 py-1.5 rounded-full hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "📍 Getting Location..." : "📍 Use Current Location"}
            </button>
          </div>

          {showResult && (
            <div className="w-full max-w-3xl mt-8 bg-white/20 backdrop-blur-md rounded-xl shadow-lg mb-8">
              <WeatherResult 
                city={city} 
                trigger={triggerFetch} 
                useCoordinates={useCoordinates}
                coordinates={coordinates}
              />
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

export default Home;
