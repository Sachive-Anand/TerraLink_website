import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PropertyPage: React.FC = () => {
  const { state } = useLocation();
  const property = state?.property;
  const navigate = useNavigate();

  if (!property) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] flex items-center justify-center">
        <p className="text-2xl text-gray-600">No property data found.</p>
      </div>
    );
  }

  // Handle Add to Favorites
  const handleAddToFavorites = () => {
    alert(`${property.title} added to favorites!`);
  };

  // Handle I'm Interested
  const handleImInterested = () => {
    alert(`We will contact you shortly about ${property.title}.`);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] p-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 px-6 py-3 bg-[#054a91] text-white rounded-full hover:bg-[#032b60] transition duration-300 shadow-lg z-50"
      >
        &larr; Back to Explore
      </motion.button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Property Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <img
                src={property.image}
                alt="Land"
                className="w-full h-auto rounded-lg"
              />
              {/* Add to Favorites Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToFavorites}
                className="mt-4 w-full px-6 py-3 bg-[#054a91] text-white rounded-full hover:bg-[#032b60] transition duration-300 flex items-center justify-center space-x-2"
              >
                <FaStar className="text-xl" />
                <span className="text-lg">Add to Favorites</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side: Property Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3 bg-white p-8 rounded-2xl shadow-lg"
          >
            <h1 className="text-4xl font-bold text-[#054a91] mb-6">{property.title}</h1>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Location</h2>
                <p className="text-xl text-gray-700">{property.location}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Price</h2>
                <p className="text-xl text-gray-700">${property.price}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Type</h2>
                <p className="text-xl text-gray-700">{property.type}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Size</h2>
                <p className="text-xl text-gray-700">{property.size}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Owner</h2>
                <p className="text-xl text-gray-700">{property.ownerName}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Contacts</h2>
                <p className="text-xl text-gray-700">{property.contacts}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Negotiable</h2>
                <p className="text-xl text-gray-700">{property.negotiable ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Amenities</h2>
                <p className="text-xl text-gray-700">{property.amenities.join(', ')}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-[#054a91] mb-4">Description</h2>
              <p className="text-xl text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* I'm Interested Button */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
            >
              <button
                onClick={handleImInterested}
                className="w-full px-12 py-4 bg-[#054a91] text-white font-semibold rounded-full hover:bg-[#032b60] transition duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <FaHeart className="text-2xl" />
                <span className="text-xl">I'm Interested</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;