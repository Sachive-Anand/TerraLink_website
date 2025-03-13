import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

const RecentApproaches: React.FC = () => {
  // Land details array
  const landDetails = [
    {
      id: 1,
      landImage: "https://placehold.co/300x200",
      landName: "Serene Countryside Land",
    },
    {
      id: 2,
      landImage: "https://placehold.co/300x200",
      landName: "Lakeside Residential Plot",
    },
    {
      id: 3,
      landImage: "https://placehold.co/300x200",
      landName: "Fertile Agricultural Land",
    },
  ];

  // Buyer details array
  const buyerDetails = [
    {
      id: 1,
      landId: 1, // Matches the landId in landDetails
      buyerName: "John Doe",
      buyerContact: "+91 9876543210",
    },
    {
      id: 2,
      landId: 1, // Matches the landId in landDetails
      buyerName: "Jane Smith",
      buyerContact: "+91 9876543211",
    },
    {
      id: 3,
      landId: 2, // Matches the landId in landDetails
      buyerName: "Ramesh Kumar",
      buyerContact: "+91 9876543212",
    },
    {
      id: 4,
      landId: 3, // Matches the landId in landDetails
      buyerName: "Priya Sharma",
      buyerContact: "+91 9876543213",
    },
  ];

  // Navigation hook
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] p-4">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)} // Go back to the previous page
        className="fixed top-4 left-4 flex items-center space-x-2 px-3 py-2 bg-[#054a91] text-white rounded-full shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        <FaArrowLeft className="text-lg" />
        <span className="hidden sm:inline">Back</span> {/* Hide text on small screens */}
      </motion.button>

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-[#054a91] mb-6 text-center"
      >
        Recent Approaches
      </motion.h1>

      {/* Grid of Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-xl">
        {landDetails.map((land) => (
          <motion.div
            key={land.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-4 rounded-xl"
          >
            {/* Land Details */}
            <div className="mb-4">
              <img
                src={land.landImage}
                alt="Land"
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <h2 className="text-lg font-bold text-[#054a91]">{land.landName}</h2>
            </div>

            {/* Buyer Details */}
            <div>
              <h3 className="text-md font-semibold text-[#054a91] mb-2">Approached Buyers</h3>
              <div className="space-y-2">
                {buyerDetails
                  .filter((buyer) => buyer.landId === land.id)
                  .map((buyer) => (
                    <motion.div
                      key={buyer.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 bg-[#f7fafc] rounded-md"
                    >
                      <p className="text-sm text-gray-700">{buyer.buyerName}</p>
                      <p className="text-xs text-gray-600">{buyer.buyerContact}</p>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentApproaches;