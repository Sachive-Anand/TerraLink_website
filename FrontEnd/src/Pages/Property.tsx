import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaHeart, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PropertyData {
  id: number;
  name: string;
  type: string;
  location: string;
  price: string;
  images: string[];
  size: string;
  amenities: string[];
  description: string;
  negotiable: boolean;
  address: string;
  owner: string;
  contacts: string;
}

const Property: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [responsePopup, setResponsePopup] = useState({
    show: false,
    message: '',
    isError: false
  });
  
  // Get the data passed from ExploreBuyer
  const { buyer_id, property_id, property_data } = location.state || {};
  
  // Store the property data in our interface
  const property: PropertyData = property_data || {
    id: 0,
    name: '',
    type: '',
    location: '',
    price: '',
    images: [],
    size: '',
    amenities: [],
    description: '',
    negotiable: false,
    address: '',
    owner: '',
    contacts: ''
  };

  if (!property_data) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] flex items-center justify-center">
        <p className="text-2xl text-gray-600">No property data found.</p>
      </div>
    );
  }

  // Handle Add to Favorites with API call
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_id: buyer_id,
          property_id: property_id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add to favorites');
      }

      // Show success popup
      setResponsePopup({
        show: true,
        message: data.message || 'Property added to favorites successfully!',
        isError: false
      });

    } catch (error) {
      // Show error popup
      setResponsePopup({
        show: true,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        isError: true
      });
    }
  };

  // Close the response popup
  const closeResponsePopup = () => {
    setResponsePopup({
      show: false,
      message: '',
      isError: false
    });
  };

  // Handle I'm Interested with API call
  const handleImInterested = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/interest/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_id: buyer_id,
          property_id: property.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register interest');
      }

      // Show success popup
      setResponsePopup({
        show: true,
        message: 'The seller has been notified of your interest. They will contact you soon!',
        isError: false
      });

    } catch (error) {
      // Show error popup
      setResponsePopup({
        show: true,
        message: error instanceof Error ? error.message : 'Failed to register interest',
        isError: true
      });
    }
  };

  // Handle image click to open slideshow
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowSlideshow(true);
  };

  // Handle slideshow navigation
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  // Render image grid
  const renderImageGrid = () => {
    const MAX_VISIBLE_IMAGES = 4;
    const imagesToShow = property.images.slice(0, MAX_VISIBLE_IMAGES);
    const remainingImages = property.images.length - MAX_VISIBLE_IMAGES;

    return (
      <div className="grid grid-cols-2 gap-4">
        {imagesToShow.map((image, index) => (
          <div 
            key={index} 
            className="relative rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={`${property.name} ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            {/* Show remaining images count on last visible image */}
            {index === MAX_VISIBLE_IMAGES - 1 && remainingImages > 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{remainingImages} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0] p-6">
      {/* Response Popup */}
      {responsePopup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 ${responsePopup.isError ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xl font-bold ${responsePopup.isError ? 'text-red-500' : 'text-green-500'}`}>
                {responsePopup.isError ? 'Error' : 'Success'}
              </h3>
              <button 
                onClick={closeResponsePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-700 mb-4">{responsePopup.message}</p>
            <button
              onClick={closeResponsePopup}
              className={`w-full py-2 px-4 rounded ${responsePopup.isError ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
            >
              OK
            </button>
          </motion.div>
        </div>
      )}

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

      {/* Image Slideshow Modal */}
      {showSlideshow && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setShowSlideshow(false)}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            <FaTimes />
          </button>
          
          <div className="relative w-full max-w-4xl">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.name} ${currentImageIndex + 1}`}
              className="w-full max-h-[80vh] object-contain"
            />
            
            {/* Navigation arrows */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70"
            >
              <FaChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70"
            >
              <FaChevronRight size={24} />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Property Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              {property.images.length > 0 ? (
                renderImageGrid()
              ) : (
                <img
                  src="https://placehold.co/600x400"
                  alt="No images available"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              
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
            <h1 className="text-4xl font-bold text-[#054a91] mb-6">{property.name}</h1>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Location</h2>
                <p className="text-xl text-gray-700">{property.location}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Price</h2>
                <p className="text-xl text-gray-700">₹{property.price}</p>
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
                <p className="text-xl text-gray-700">{property.owner}</p>
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
              <div>
                <h2 className="text-2xl font-semibold text-[#054a91] mb-2">Address</h2>
                <p className="text-xl text-gray-700">{property.address}</p>
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

export default Property;