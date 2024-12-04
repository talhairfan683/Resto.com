import React, { useState } from "react";
import { toast } from 'react-toastify';

const Broadcast = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleBroadcast = () => {
    if (!title || !contents) {
      toast.error("Please fill out both the title and contents!");
      return;
    }
    console.log(`Broadcasting:\nTitle: ${title}\nContents: ${contents}`);
    toast.success('Broadcasting');
    // Add your broadcast logic here (e.g., API call)
    setTitle("");
    setContents("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBroadcast();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="m-7 ml-32">
        <h1 className="text-2xl font-bold text-gray-800">Broadcast Notification</h1>
        <p className="text-sm text-gray-600 mt-2">
          Here you will be able to broadcast notification to all your users.
        </p>
      </div>

      {/* Collapsible Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 max-w-5xl mx-auto">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-xl font-semibold text-black">
            Broadcast to all users
          </h2>
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
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Notification Title Here"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Contents Input */}
              <div>
                <label
                  htmlFor="contents"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Contents
                </label>
                <textarea
                  id="contents"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  onKeyDown={handleKeyDown}
                  /* Trigger handleBroadcast on Enter */
                  placeholder="Enter Notification Contents Here"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  rows={4}
                />
              </div>

              {/* Broadcast Button */}
              <div>
                <button
                  onClick={handleBroadcast}
                  className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                >
                  Broadcast to everyone
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Broadcast;
