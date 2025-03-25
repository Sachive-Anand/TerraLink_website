import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaHeart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Favourites: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const buyer_id = location.state?.buyer_id;
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch favorites from API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!buyer_id) {
          throw new Error('No buyer ID found');
        }

        const response = await fetch('http://127.0.0.1:5000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buyer_id: buyer_id }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status} status`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Debugging

        // Extract properties array from different possible response formats
        let favoritesArray = [];
        
        if (Array.isArray(data)) {
          favoritesArray = data;
        } else if (data.properties && Array.isArray(data.properties)) {
          favoritesArray = data.properties;
        } else if (data.favorites && Array.isArray(data.favorites)) {
          favoritesArray = data.favorites;
        } else if (data.data && Array.isArray(data.data)) {
          favoritesArray = data.data;
        } else if (data.cart && Array.isArray(data.cart)) {
          favoritesArray = data.cart;
        } else {
          throw new Error('Response does not contain a valid array of properties');
        }

        // Format properties with defaults
        const formattedProperties = favoritesArray.map((item: any) => ({
          id: item.id || Math.random().toString(36).substr(2, 9),
          name: item.name || item.title || 'Untitled Property',
          location: item.location || 'Location not specified',
          price: item.price ? `₹${item.price}` : '₹0',
          images: Array.isArray(item.images) ? item.images : 
                 item.image ? [item.image] : ["https://placehold.co/600x400"],
          type: item.type || 'Not specified',
          size: item.size || 'Not specified',
          amenities: Array.isArray(item.amenities) ? item.amenities : []
        }));

        setProperties(formattedProperties);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err instanceof Error ? err.message : 'Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [buyer_id]);

  // Handle remove from favorites
  const handleRemoveFavourite = async (propertyId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/cart/${buyer_id}/${propertyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }

      setProperties(prev => prev.filter(property => property.id !== propertyId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  };

  // Handle view details
  const handleViewDetails = (property: any) => {
    navigate('/property', { 
      state: { 
        property_id: property.id,
        property_data: property,
        buyer_id: buyer_id
      } 
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#054a91] mx-auto"></div>
          <p className="mt-4 text-[#054a91]">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Favorites</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60]"
            >
              Try Again
            </button>
            <Link 
              to="/explore" 
              state={{ buyer_id: buyer_id }}
              className="px-4 py-2 border border-[#054a91] text-[#054a91] rounded hover:bg-gray-100"
            >
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        Your Favourites
      </motion.h1>

      {/* Favourites List */}
      <div className="max-w-7xl mx-auto">
        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <FaHeart className="text-5xl text-gray-400 mx-auto mb-4" />
            <p className="text-2xl text-gray-600">No favorites added yet.</p>
            <Link 
              to="/explore" 
              state={{ buyer_id: buyer_id }}
              className="mt-4 inline-block px-6 py-3 bg-[#054a91] text-white rounded-full hover:bg-[#032b60] transition duration-300"
            >
              Explore Properties
            </Link>
          </motion.div>
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
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Remove from Favourites Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveFavourite(property.id)}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition duration-300"
                  >
                    <FaTimes className="text-xl" />
                  </motion.button>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#054a91] mb-2">{property.name}</h2>
                  <p className="text-xl text-gray-600 mb-2">{property.location}</p>
                  <p className="text-xl text-gray-800 font-semibold mb-2">{property.price}</p>
                  <p className="text-xl text-gray-600 mb-2">{property.type}</p>
                  <p className="text-xl text-gray-600 mb-2">{property.size}</p>
                  {property.amenities.length > 0 && (
                    <p className="text-xl text-gray-600 mb-4">{property.amenities.join(', ')}</p>
                  )}

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