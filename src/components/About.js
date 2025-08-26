import Footer from "./Footer";

function About() {
  return (
    <div
      className={`
        relative h-screen bg-fixed bg-cover bg-center bg-no-repeat text-white px-4 pt-20 pb-24
        bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')] 
        md:bg-none
      `}
    >
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 space-y-5 pt-2 max-w-3xl mx-auto">

        <div className="bg-white/20 mt-2 p-2 backdrop-blur-md rounded-2xl shadow-md md:p-6 border border-white/30">
          <h2 className="text-2xl font-semibold text-black mb-2">🌦️ Purpose</h2>
          <p className="text-xl md:text-base text-blue-950 md:text-white">
            This app helps users get real-time weather updates with elegant UI and location-based forecasting.
          </p>
        </div>

        <div className="bg-white/20 mt-2 p-2 backdrop-blur-md rounded-2xl shadow-md  md:p-6 border border-white/30">
          <h2 className="text-2xl font-semibold text-black  mb-2">👨‍💻 Built With</h2>
          <p className="text-xl md:text-base text-blue-950 md:text-white">
            React, Tailwind CSS, and OpenWeather API. Optimized for performance and accessibility.
          </p>
        </div>

        <div className="bg-white/20 mt-2 p-2 backdrop-blur-md rounded-2xl shadow-md  md:p-6 border border-white/30">
          <h2 className="text-2xl font-semibold text-black  mb-2">📱 Features Coming Soon</h2>
          <p className="text-xl md:text-base text-blue-950 md:text-white">
            Dark mode, severe weather alerts, and a weekly forecast chart are on the roadmap.
          </p>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full z-20">
        <Footer />
      </div>
    </div>
  );
}

export default About;



// import Footer from "./Footer";

// function About() {
//   return (
//     <div
//     className={`
//         relative  bg-fixed bg-cover  bg-center bg-no-repeat text-white px-4 md:pt-20 pt:10 pb-24
//         bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')]
//         md:bg-none
//       `}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/15 z-0"></div>

//       {/* Main content */}
//       <div className="relative z-10 flex-1 pt-6 pb-2 max-w-3xl mx-auto space-y-2 px-4">
//         {/* Purpose */}
//         <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-md p-5 md:p-8 border border-white/30">
//           <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-2">🌦️ Purpose</h2>
//           <p className="text-sm md:text-base text-slate-950">
//             This app helps users get real-time weather updates with elegant UI and location-based forecasting.
//           </p>
//         </div>

//         {/* Built With */}
//         <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-md p-5 md:p-8 border border-white/30">
//           <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-2">👨‍💻 Built With</h2>
//           <p className="text-sm md:text-base text-slate-950">
//             React, Tailwind CSS, and OpenWeather API. Optimized for performance and accessibility.
//           </p>
//         </div>

//         {/* Coming Soon */}
//         <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-md p-5 md:p-8 border border-white/30">
//           <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-2">📱 Features Coming Soon</h2>
//           <p className="text-sm md:text-base text-slate-950">
//             Dark mode, severe weather alerts, and a weekly forecast chart are on the roadmap.
//           </p>
//         </div>
//         <div className="fixed bottom-0 left-0 w-full z-20">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default About;
