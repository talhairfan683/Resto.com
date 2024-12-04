import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const AddVender = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!name || !userName || !password) {
      toast.error("Please fill in all fields."); // Show error toast
      return;
    }

    try {
      const res = await axios.post(
        'https://resto-practice.vercel.app/superAdmin/addRestaurant',
        {
          name: name,
          username: userName,
          password: password
        }
      );

      console.log(res.data);

      // Show success toast
      toast.success("Credentials successfully generated!");

      // Reset input fields
      setName('');
      setUserName('');
      setPassword('');

    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Network error, please try again.";

      // Show error toast
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className='ml-10 mt-20'>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add New Vendor</h1>
        <p className="text-sm text-gray-600 mt-2 mb-5">
          Here you are able to add new vendor into your system.
        </p>
      </div>

      {/* Collapsible Section */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-gray-200 max-w-6xl">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-xl font-semibold text-black">
            Add new restaurant
          </h2>
          <span
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            ▲
          </span>
        </div>

        {/* Form Fields */}
        {isExpanded && (
          <div className="bg-blue-100 mt-4 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Credential Details
            </h3>
            <div className="grid grid-cols-2 gap-4 border-gray-300">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Restaurant Name Here"
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  placeholder="Enter Username for Panel"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  /* Trigger handleSubmit on Enter */
                  placeholder="Enter Password for Panel"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-md hover:bg-green-600"
                onClick={handleSubmit}
              >
                Generate Credentials
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddVender;
