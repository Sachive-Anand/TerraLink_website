import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart , FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Interested: React.FC = () => {
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
    interested: boolean;
  }

  // Dummy property data
  const [properties, setProperties] = useState<Property[]>([    
    {
      id: 1,
      title: "Modern Villa in the Hills",
      location: "Pune, Maharashtra",
      price: "250,000",
      image: "https://placehold.co/300x200",
      type: "Villa",
      size: "4,000 sqft",
      amenities: ["Swimming Pool", "Garden", "Garage"],
      interested: false,
    },
    {
      id: 2,
      title: "Luxury Apartment Downtown",
      location: "Delhi, NCR",
      price: "300,000",
      image: "https://placehold.co/300x200",
      type: "Apartment",
      size: "2,500 sqft",
      amenities: ["Gym", "Security", "Parking"],
      interested: false,
    },
    {
      id: 3,
      title: "Beachfront Property",
      location: "Goa",
      price: "500,000",
      image: "https://placehold.co/300x200",
      type: "Resort",
      size: "10,000 sqft",
      amenities: ["Private Beach", "Spa", "Bar"],
      interested: false,
    },
  ]);

  // Navigation hook
  const navigate = useNavigate();

  // Handle adding/removing property from Interested list
  const toggleInterested = (id: number) => {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id ? { ...property, interested: !property.interested } : property
      )
    );
  };
   // Handle remove from favourites
   const handleRemoveFavourite = (id: number) => {
    setProperties((prev) => prev.filter((property) => property.id !== id));
  };

  const handleViewDetails = (property: Property) => {
    navigate('/property', { state: { property } });
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] p-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 bg-[#054a91] text-white rounded-full shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        <FaArrowLeft className="text-lg" />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-[#054a91] mb-8 text-center"
      >
        Interested Properties
      </motion.h1>

      {/* Property List */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
          >
            {/* Property Image */}
            <img
              src={property.image}
              alt="Property"
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
    </div>
  );
};

export default Interested;