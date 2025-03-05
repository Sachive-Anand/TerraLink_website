import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Favourites: React.FC = () => {
  // Property interface
  interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    image: string;
    type: string;
    size: string;
    amenities: string[];
    favourite: boolean;
  }

  // Dummy data with favourite attribute
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Serene Countryside Land",
      location: "Mumbai, Maharashtra",
      price: "150,000",
      image: "https://placehold.co/300x200",
      type: "Agricultural Land",
      size: "10 acres",
      amenities: ["Water", "Electricity"],
      favourite: true,
    },
    {
      id: 2,
      title: "Lakeside Residential Plot",
      location: "Bangalore, Karnataka",
      price: "200,000",
      image: "https://placehold.co/300x200",
      type: "Residential Land",
      size: "5 acres",
      amenities: ["Water", "Electricity", "Park"],
      favourite: true,
    },
    {
      id: 3,
      title: "Fertile Agricultural Land",
      location: "Hyderabad, Telangana",
      price: "95,000",
      image: "https://placehold.co/300x200",
      type: "Agricultural Land",
      size: "20 acres",
      amenities: ["Water"],
      favourite: true,
    },
  ]);

  // Navigation hook
  const navigate = useNavigate();

  // Handle remove from favourites
  const handleRemoveFavourite = (id: number) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
  };

  // Handle view details
  const handleViewDetails = (property: Property) => {
    navigate('/property', { state: { property } });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] p-6">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-[#054a91] mb-8 text-center"
      >
        Your Favourites
      </motion.h1>

      {/* Favourites List */}
      <div className="max-w-7xl mx-auto">
        {properties.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-gray-600 text-center"
          >
            No favourites added yet.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.image}
                    alt="Land"
                    className="w-full h-48 object-cover"
                  />
                  {/* Remove from Favourites Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavourite(property.id)}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-[#054a91] hover:text-white transition duration-300"
                  >
                    <FaTimes className="text-xl" />
                  </motion.button>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#054a91] mb-2">{property.title}</h2>
                  <p className="text-xl text-gray-600 mb-2">{property.location}</p>
                  <p className="text-xl text-gray-800 font-semibold mb-2">${property.price}</p>
                  <p className="text-xl text-gray-600 mb-2">{property.type}</p>
                  <p className="text-xl text-gray-600 mb-2">{property.size}</p>
                  <p className="text-xl text-gray-600 mb-4">{property.amenities.join(', ')}</p>

                  {/* View Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDetails(property)}
                    className="w-full px-6 py-3 bg-[#054a91] text-white rounded-full hover:bg-[#032b60] transition duration-300"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;