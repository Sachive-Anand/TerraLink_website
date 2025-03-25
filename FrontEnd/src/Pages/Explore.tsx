import React, { useState, useEffect } from 'react';
import logo from "../assets/logo5.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaSignOutAlt, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  images: string[];
  size: string;
  amenities: string[];
}

const Explore: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter states
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Login modal state
  const [showLoginModal, setShowLoginModal] = useState(false);

  // List of Indian cities and amenities for filters
  const indianCities = [
    "Mumbai, Maharashtra",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Delhi, Delhi",
    "Chennai, Tamil Nadu",
    "Pune, Maharashtra",
    "Kolkata, West Bengal",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
  ];

  const amenitiesList = ["Water", "Electricity", "Park", "Parking", "Pool", "Forest", "Gym", "Security"];

  const navigate = useNavigate();

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/explore');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Access the properties array from the response
        if (!data.properties || !Array.isArray(data.properties)) {
          throw new Error('Expected properties array in response');
        }

        // Transform the properties data
        const formattedProperties = data.properties.map((property: any) => ({
          id: property.id,
          name: property.name,
          location: property.location,
          price: property.price,
          images: property.images || [],
          size: property.size,
          amenities: property.amenities || []
        }));

        setProperties(formattedProperties);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle filter button click
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  // Handle okay button click in filter modal
  const handleOkayClick = () => {
    if (selectedSize && isNaN(Number(selectedSize))) {
      setError('Size must be a number');
      return;
    }
    setError('');
    setShowFilterModal(false);
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Filter cities based on search
  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  // Filter properties based on selected filters
  const filteredProperties = properties.filter((property) => {
    // Filter by search query
    if (
      searchQuery &&
      !property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    const price = parseFloat(property.price.replace(/,/g, ''));
    if (price < selectedPriceRange[0] || price > selectedPriceRange[1]) return false;

    // Filter by location
    if (selectedLocation && property.location !== selectedLocation) return false;

    // Filter by size
    if (selectedSize && property.size !== selectedSize) return false;

    // Filter by amenities
    if (selectedAmenities.length > 0 && !selectedAmenities.every((amenity) => property.amenities.includes(amenity))) {
      return false;
    }

    return true;
  });

  // Handle login navigation
  const handleLogin = () => {
    setShowLoginModal(false);
    navigate('/buyerLogin');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#E4E4E4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#054a91] mx-auto"></div>
          <p className="mt-4 text-[#054a91]">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#E4E4E4]">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Properties</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#E4E4E4]">
      {/* Navbar */}
      <div className="w-full h-[75px] flex items-center justify-between px-6 bg-white shadow-md">
        <div className="flex-grow flex justify-center md:justify-start">
          {/* <img src={logo} alt="Logo" className="h-12 w-35" /> */}
          <Link to="/home">
            <img src={logo} alt="Logo" className="h-12 w-35 cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/home">
            <button className="flex items-center space-x-2 px-6 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1">
              <FaSignOutAlt className="text-lg" />
              <span>Log Out</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Explore Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 shadow-md rounded-xl">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-[#054a91]">Explore Lands</h1>
            <p className="text-gray-600">Find the perfect land for your needs. Use the filter to refine your search.</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input and Button */}
            <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="outline-none text-sm"
              />
              <button className="text-[#054a91] hover:text-[#032b60]">
                <FaSearch className="text-lg" />
              </button>
            </div>
            {/* Filter Button */}
            <button
              onClick={handleFilterClick}
              className="flex items-center space-x-2 px-5 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1"
            >
              <FaFilter className="text-lg" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Property List Section */}
      <div className="max-w-7xl mx-auto p-6">
        {filteredProperties.length === 0 ? (
          <div className="text-center bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500">No properties match the selected filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('');
                setSelectedPriceRange([0, 100000000]);
                setSelectedLocation('');
                setSelectedSize('');
                setSelectedAmenities([]);
              }}
              className="mt-4 px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
                {/* Display only the first image */}
                <img
                  src={property.images.length > 0 ? property.images[0] : "https://placehold.co/300x200"}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-[#054a91] truncate">{property.name}</h2>
                  <p className="text-gray-600 truncate">{property.location}</p>
                  <p className="text-gray-800 font-semibold">₹{property.price}</p>
                  <p className="text-gray-600 truncate">{property.size}</p>
                  {property.amenities.length > 0 && (
                    <p className="text-gray-600 truncate">{property.amenities.join(', ')}</p>
                  )}
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="w-full mt-4 px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60] transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 rounded-xl">
          <div className="bg-white p-4 rounded-2xl w-full max-w-sm h-auto max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#054a91]">Filter Options</h2>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Property Type */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full p-2 border rounded text-sm">
                <option value="">Select</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Commercial Land">Commercial Land</option>
                <option value="Residential Land">Residential Land</option>
                <option value="Recreational Land">Recreational Land</option>
                <option value="Houses">Houses</option>
                <option value="Rentals">Rentals</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <input
                type="range"
                min="0"
                max="100000000"
                step="1000"
                value={selectedPriceRange[0]}
                onChange={(e) => setSelectedPriceRange([Number(e.target.value), selectedPriceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="100000000"
                step="1000"
                value={selectedPriceRange[1]}
                onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>₹{selectedPriceRange[0]}</span>
                <span>₹{selectedPriceRange[1]}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="">Select City</option>
                {indianCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Size/Area */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Size/Area</label>
              <input
                type="text"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter size/area"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Amenities */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Amenities</label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {amenitiesList.map((amenity, index) => (
                  <label key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="mr-2"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowFilterModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleOkayClick} className="px-4 py-2 bg-[#054a91] text-white rounded text-sm hover:bg-[#032b60]">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold text-[#054a91] mb-4">Login Required</h2>
            <p className="text-gray-600 mb-4">You need to log in to view property details.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-[#054a91] text-white rounded hover:bg-[#032b60]"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;