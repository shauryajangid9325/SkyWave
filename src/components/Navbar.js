import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="bg-gray-800 fixed top-0 left-0 w-full z-50 text-white text-left md:text-xl shadow-md md:flex md:items-center md:justify-between md:p-4">
      {/* Top Row: Logo and Hamburger */}
      <div className="flex justify-between items-center px-4 py-3 md:p-0">
        <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide">
          <span className="md:text-2xl">🛰️</span>
          <span className="italic text-sm md:text-xl"> SkyWave </span>
          <span className="italic text-sm md:text-xl text-blue-300">– Feel The Flow</span>
        </h1>

        {/* Hamburger button visible only on small screens */}
        <button
          className="block md:hidden text-3xl"
          onClick={toggleNavbar}
          aria-label="Toggle Navigation"
        >
          <i className="ri-align-justify"></i>
        </button>
      </div>

      {/* Nav Links */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isNavOpen ? "flex flex-col max-h-40 opacity-100" : "max-h-0 opacity-0"
        } md:flex md:flex-row md:items-center md:space-x-6 md:space-y-0 md:max-h-full md:opacity-100`}
      >
        <div className="md:flex flex flex-col space-y-2 pl-5 pb-4 md:pb-0 md:flex-row md:space-y-0 md:space-x-4">
          <Link to="/" onClick={closeNavbar} className="hover:text-yellow-300 transition-colors">
            🏠 Home
          </Link>
          <Link to="/forecast" onClick={closeNavbar} className="hover:text-yellow-300 transition-colors">
            ⏳ Forecast
          </Link>
          <Link to="/about" onClick={closeNavbar} className="hover:text-yellow-300 transition-colors">
            📜 About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
