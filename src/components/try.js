import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav
      className={`bg-gray-800 text-white p-4 shadow-md transition-all duration-300
      flex flex-col md:flex-row md:justify-between md:items-center
      ${isNavOpen ? "h-64" : "h-16"} overflow-hidden`}
    >
      {/* Logo & Toggle Row */}
      <div className="flex justify-between items-center w-full">
        <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide">
          <span>🛰️</span>
          <span>SkyWave</span>
          <span className="italic text-blue-300 text-xl">– Feel The Flow</span>
        </h1>

        {/* Toggle button for small devices */}
        <button
          className="block md:hidden text-3xl text-white"
          onClick={toggleNavbar}
        >
          <i className="ri-align-justify"></i>
        </button>
      </div>

      {/* Nav Links */}
      <div
        className={`mt-4 flex-col items-start space-y-2 text-lg md:mt-0 md:space-y-0 md:space-x-4 md:flex-row md:flex ${
          isNavOpen ? "flex" : "hidden"
        }`}
      >
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>
        <Link to="/forecast" className="hover:text-yellow-400">
          Forecast
        </Link>
        <Link to="/about" className="hover:text-yellow-400">
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
