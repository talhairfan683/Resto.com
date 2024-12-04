import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const InAppPoint = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [pointsPerTopUp, setPointsPerTopUp] = useState("");
  const [pointsDiscount, setPointsDiscount] = useState("");

  useEffect(() => {
    // Retrieve stored values on mount
    const storedPointsPerTopUp = localStorage.getItem("pointsPerTopUp");
    const storedPointsDiscount = localStorage.getItem("pointsDiscount");

    if (storedPointsPerTopUp) setPointsPerTopUp(storedPointsPerTopUp);
    if (storedPointsDiscount) setPointsDiscount(storedPointsDiscount);
  }, []);

  const handleSave = () => {
    if (!pointsPerTopUp || !pointsDiscount) {
      toast.error("Please fill in both fields!");
      return;
    }

    // Save settings to local storage
    localStorage.setItem("pointsPerTopUp", pointsPerTopUp);
    localStorage.setItem("pointsDiscount", pointsDiscount);

    console.log(
      `Saved Settings:\nPoints Received per Top-up: ${pointsPerTopUp}\nPoints Discount Redeem: ${pointsDiscount}`
    );

    toast.success("Settings saved successfully!");

    // Reset input fields
    setPointsPerTopUp("");
    setPointsDiscount("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="m-7 ml-32">
        <h1 className="text-2xl font-bold text-gray-800">
          Membership Points Management
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Here you will be able to manage how many points users will receive per
          each top-up they make into the wallet.
        </p>
      </div>

      {/* Collapsible Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 max-w-5xl mx-auto">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-xl font-semibold text-black">Points Management</h2>
          <span
            className={`transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▲
          </span>
        </div>

        {/* Form Section */}
        {isExpanded && (
          <div className="bg-gray-50 mt-4 p-4 rounded-md">
            <div className="space-y-4">
              {/* Points Received per Top-up */}
              <div>
                <label
                  htmlFor="pointsPerTopUp"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Points Received per Top-up
                </label>
                <input
                  id="pointsPerTopUp"
                  type="text"
                  value={pointsPerTopUp}
                  onChange={(e) => setPointsPerTopUp(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="RM 1 = 10 points"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Points Discount Redeem */}
              <div>
                <label
                  htmlFor="pointsDiscount"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Points Discount Redeem
                </label>
                <input
                  id="pointsDiscount"
                  type="text"
                  value={pointsDiscount}
                  onChange={(e) => setPointsDiscount(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="10 points = RM 1 OFF/"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Save Button */}
              <div>
                <button
                  onClick={handleSave}
                  className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InAppPoint;
