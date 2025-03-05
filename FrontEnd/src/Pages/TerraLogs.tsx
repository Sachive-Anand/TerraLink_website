import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TerraLogs: React.FC = () => {
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
    sellerName: string;
    uploadDate: string;
  }

  // Dummy data for seller uploads
  const properties: Property[] = [
    {
      id: 1,
      title: "Serene Countryside Land",
      location: "Mumbai, Maharashtra",
      price: "150,000",
      image: "https://placehold.co/300x200",
      type: "Agricultural Land",
      size: "10 acres",
      amenities: ["Water", "Electricity"],
      sellerName: "John Doe",
      uploadDate: "2023-10-01",
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
      sellerName: "Jane Smith",
      uploadDate: "2023-10-05",
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
      sellerName: "Ramesh Kumar",
      uploadDate: "2023-10-10",
    },
  ];

  // Navigation hook
  const navigate = useNavigate();

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
        TerraLogs
      </motion.h1>

      {/* Property List */}
      <div className="max-w-7xl mx-auto">
        {properties.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl text-gray-600 text-center"
          >
            No properties uploaded yet.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleViewDetails(property)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
              >
                {/* Property Image */}
                <img
                  src={property.image}
                  alt="Land"
                  className="w-full h-48 object-cover"
                />

                {/* Property Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#054a91] mb-2">{property.title}</h2>
                  <p className="text-xl text-gray-600 mb-2">{property.location}</p>
                  <p className="text-xl text-gray-800 font-semibold mb-2">${property.price}</p>
                  <p className="text-xl text-gray-600 mb-2">{property.type}</p>
                  <p className="text-xl text-gray-600 mb-2">{property.size}</p>
                  <p className="text-xl text-gray-600 mb-2">Uploaded by: {property.sellerName}</p>
                  <p className="text-xl text-gray-600">Uploaded on: {property.uploadDate}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TerraLogs;