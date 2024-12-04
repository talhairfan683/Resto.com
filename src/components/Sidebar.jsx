import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for detecting the active route

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const location = useLocation(); // Get the current route

  // Click handler for navigation
  const handleNavigation = (route) => {
    navigate(route);
  };

  // Helper function to check if the route is active
  const isActive = (route) => location.pathname === route;

  return (
    <aside className="w-64 bg-white border-r border-gray-300 p-4">
      {/* Sidebar Heading */}
      <h2 className="text-lg font-medium text-black mb-6">Pages</h2>

      {/* Dropdown Menu */}
      <div>
        {/* Dropdown Header */}
        <button
          className="flex items-center justify-between w-full bg-yellow-500 text-white px-4 py-3 rounded-md focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Super Admins</span>
          <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <ul className="mt-5 space-y-5">
            <li
              className={`flex items-center cursor-pointer ${
                isActive('/add-vendor') ? 'border-l-4 border-yellow-500 bg-gray-100 h-12 text-yellow-300' : ''
              }`}
              onClick={() => handleNavigation('/add-vendor')}
            >
              <span className="text-black ml-3">Add Vendor</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                isActive('/manage-vendor') ? 'border-l-4 border-yellow-500 bg-gray-100 h-12 text-yellow-300' : ''
              }`}
              onClick={() => handleNavigation('/manage-vendor')}
            >
              <span className="text-black ml-3">Manage Vendor</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                isActive('/broadcast-notif') ? 'border-l-4 border-yellow-500 bg-gray-100 h-12' : ''
              }`}
              onClick={() => handleNavigation('/broadcast-notif')}
            >
              <span className="text-black ml-3">Broadcast Notification</span>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                isActive('/in-app-points') ? 'border-l-4 border-yellow-500 bg-gray-100 h-12' : ''
              }`}
              onClick={() => handleNavigation('/in-app-points')}
            >
              <span className="text-black ml-3">In-app Points</span>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
