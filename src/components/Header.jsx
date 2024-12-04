import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  


  const handleSignOut = () => {
    localStorage.clear()
    // Add any sign-out logic here if needed (e.g., clearing tokens, etc.)
    navigate('/'); // Redirect to the home page
    toast.success("Success Sign out")


  };

  return (
    <header className="flex justify-between items-center px-4 py-6 border-b border-gray-300">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        {/* Placeholder for Logo */}
        <img src="./image 11 (1).png" alt="Logo" />
      </div>

      {/* Spacer Section */}
      <div className="flex-grow"></div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut} // Attach the click handler
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
