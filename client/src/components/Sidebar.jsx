// src/Sidebar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CgSidebarOpen } from "react-icons/cg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Initialize isOpen as false

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 786) {
        // Adjust 768px as per your medium breakpoint
        setIsOpen(true); // Open sidebar if screen width is greater than medium breakpoint
      } else {
        setIsOpen(false); // Close sidebar if screen width is less than or equal to medium breakpoint
      }
    };

    // Call handleResize on component mount to set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white fixed top-20 left-0 h-screen ${
        isOpen ? "w-64" : "w-20"
      } md:w-20 lg:w-64 z-50 transition-width duration-300 ease-in-out`}
    >
      <div
        className={`text-center text-xl ${
          isOpen ? "bg-gray-600" : ""
        } p-2 uppercase`}
      >
        {isOpen ? "MENU" : ""}
      </div>
      {/* Sidebar content */}
      {isOpen && (
        <div className="p-3">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-700 text-lg">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-700 text-lg">
              <Link to="/pdfs">PDFs</Link>
            </li>
          </ul>
        </div>
      )}
      {/* Toggle button for mobile */}
      <button
        className="lg:hidden absolute top-3 right-2 text-white text-center"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <IoMdClose className="text-xl bg-red-500" />
        ) : (
          <CgSidebarOpen className="text-2xl " />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
