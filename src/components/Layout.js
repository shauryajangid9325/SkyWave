// // components/Layout.js
// import { useRef, useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   const headerRef = useRef(null);
//   const footerRef = useRef(null);
//   const [contentHeight, setContentHeight] = useState("auto");

//   const updateContentHeight = () => {
//     const headerHeight = headerRef.current?.offsetHeight || 0;
//     const footerHeight = footerRef.current?.offsetHeight || 0;
//     const windowHeight = window.innerHeight;
//     const calculatedHeight = windowHeight - (headerHeight + footerHeight);
//     setContentHeight(calculatedHeight);
//   };

//   useEffect(() => {
//     updateContentHeight();
//     window.addEventListener("resize", updateContentHeight);

//     const observer = new MutationObserver(updateContentHeight);
//     if (headerRef.current) {
//       observer.observe(headerRef.current, { childList: true, subtree: true });
//     }

//     return () => {
//       window.removeEventListener("resize", updateContentHeight);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <div ref={headerRef}>
//         <Navbar onToggle={updateContentHeight} />
//       </div>

//       <main className="home-content relative z-[99]" style={{ height: contentHeight }}>
//         {children}
//       </main>

//       <div ref={footerRef}>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Layout;
