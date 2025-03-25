import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate,Link} from 'react-router-dom';

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  size: string;
  amenities: string[];
  images: string[];
}

const Interested: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const buyer_id = location.state?.buyer_id;

  // Fetch interested properties from API
  useEffect(() => {
    const fetchInterestedProperties = async () => {
      try {
        if (!buyer_id) {
          throw new Error('Please login to view interested properties');
        }

        const response = await fetch('http://127.0.0.1:5000/interest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ buyer_id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch interested properties');
        }

        const data = await response.json();
        
        if (data.message === "No interests found") {
          setProperties([]);
        } else {
          setProperties(data.interests || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load interested properties');
      } finally {
        setLoading(false);
      }
    };

    fetchInterestedProperties();
  }, [buyer_id]);

  // Handle remove from interested list
  const handleRemoveInterested = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/interest/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_id: buyer_id,
          property_id: id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove property from interested list');
      }

      // Update local state
      setProperties(prev => prev.filter(property => property.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove property');
    }
  };

  const handleViewDetails = (property: Property) => {
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
          <p className="mt-4 text-[#054a91]">Loading your interested properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center gap-4">
            {error === 'Please login to view interested properties' ? (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60]"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60]"
              >
                Try Again
              </button>
            )}
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
        className="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 bg-[#054a91] text-white rounded-full shadow-md hover:bg-[#032b60] transition duration-300"
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
      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FaHeart className="text-5xl text-gray-400 mx-auto mb-4" />
          <p className="text-2xl text-gray-600">You haven't shown interest in any properties yet</p>
          <p className="text-lg text-gray-500 mb-6">Explore properties and mark them as interested!</p>
          <Link 
            to="/explore" 
            state={{ buyer_id: buyer_id }}
            className="inline-block px-6 py-3 bg-[#054a91] text-white rounded-full hover:bg-[#032b60] transition duration-300"
          >
            Browse Properties
          </Link>
        </motion.div>
      ) : (
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
                src={property.images[0] || "https://placehold.co/600x400"}
                alt={property.name}
                className="w-full h-48 object-cover"
              />

              {/* Remove from Interested Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRemoveInterested(property.id)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-red-500 hover:text-white transition duration-300"
              >
                <FaTimes className="text-xl" />
              </motion.button>

              {/* Property Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#054a91] mb-2">{property.name}</h2>
                <p className="text-xl text-gray-600 mb-2">{property.location}</p>
                <p className="text-xl text-gray-800 font-semibold mb-2">₹{property.price}</p>
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
  );
};

export default Interested;