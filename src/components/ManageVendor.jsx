import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageVendor = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [changeAccount, setChangeAccount] = useState(""); // Stores the ID of account to change password
  const [deleteAccount, setDeleteAccount] = useState(""); // Stores the ID of account to delete
  const [vendors, setVendors] = useState([]); // Ensure vendors is always initialized as an array
  const [searchQuery, setSearchQuery] = useState(""); // For filtering vendors
  const [newPassword, setNewPassword] = useState(""); // Stores the new password for change
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the password change modal
  const [loading, setLoading] = useState(false); // Loading state for delete operation

  // Fetch vendors from the server
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(
          "https://resto-practice.vercel.app/superAdmin/getRestaurants"
        );
        setVendors(res.data.restaurants); // Set fetched vendors to the state variable
      } catch (error) {
        toast.error("Error fetching vendors:", error.response?.data || error.message);
        setVendors([]); // Set vendors to an empty array in case of error
      }
    };

    fetchVendors();
  }, []);

  // Delete account
  const deleteaccount = async (id) => {
    if (!window.confirm("Are you sure you want to delete this account?")) return;
    setLoading(true);
    try {
      const res = await axios.delete(
        `https://resto-practice.vercel.app/superAdmin/deleteRestaurant?id=${id}`,
      
      );
      // After deleting, refresh the list or handle state update
      setVendors(vendors.filter((vendor) => vendor._id !== id)); // Ensure you're filtering by _id
    } catch (error) {
      toast.error("Delete Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      toast.success('Delete Success')
    }
  };

  // Change account password
  const changePassword = async (id) => {
    if (!newPassword) {
      alert("Please enter a new password.");
      return;
    }

    try {
      const res = await axios.put(
        `https://resto-practice.vercel.app/superAdmin/changeRestaurantPassword?id=${id}`,
        { newPassword }
      );
      console.log("Change Password Response:", res.data);
      toast.success('Change Password Response');
      setShowModal(false); // Close the modal after successful password change
      setNewPassword(""); // Clear the new password input
    } catch (error) {
      toast.error("Change Password Error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="m-7 ml-32">
        <h1 className="text-2xl font-bold text-gray-800">Manage All Vendors</h1>
        <p className="text-sm text-gray-600 mt-2">
          Here you are able to manage all signed vendors on your platform.
        </p>
      </div>

      {/* Collapsible Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 max-w-5xl mx-auto">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-xl font-semibold text-black">All Registered Vendors</h2>
          <span
            className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            ▲
          </span>
        </div>

        {/* Vendor List */}
        {isExpanded && (
          <div className="bg-gray-50 mt-4 p-4 rounded-md">
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search vendor registered name here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Vendor Table */}
            <ul className="space-y-2">
              {vendors
                .filter((vendor) =>
                  vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((vendor, index) => (
                  <li
                    key={vendor._id} // Ensure you're using the _id here
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-md border border-gray-200"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {index + 1}. {vendor.name}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        className="px-3 py-1 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400"
                        onClick={() => {
                          setChangeAccount(vendor._id); // Store vendor _id
                          setShowModal(true); // Show the modal
                        }}
                      >
                        Change Password
                      </button>
                      <button
                        className={`px-3 py-1 text-white text-sm font-medium rounded-md ${
                          loading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={() => deleteaccount(vendor._id)}
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Delete Account"}
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal for Password Change */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)} // Close modal
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => changePassword(changeAccount)} // Submit new password
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVendor;
