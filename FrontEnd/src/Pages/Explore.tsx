import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import logo from "../assets/logo5.png";

const Explore: React.FC = () => {
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
  }

  // Dummy data with respect to filter options
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
    },
    {
      id: 4,
      title: "Commercial Land Near Highway",
      location: "Delhi, Delhi",
      price: "300,000",
      image: "https://placehold.co/300x200",
      type: "Commercial Land",
      size: "2 acres",
      amenities: ["Water", "Electricity", "Parking"],
    },
    {
      id: 5,
      title: "Luxury Beachfront Plot",
      location: "Chennai, Tamil Nadu",
      price: "750,000",
      image: "https://placehold.co/300x200",
      type: "Residential Land",
      size: "1 acre",
      amenities: ["Water", "Electricity", "Pool"],
    },
  ];

  // List of Tamil Nadu cities
  const tamilNaduCities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Vellore",
    "Erode",
    "Thoothukudi",
    "Dindigul",
    "Thanjavur",
    "Hosur",
    "Nagercoil",
    "Kanchipuram",
    "Kumbakonam",
    "Tiruppur",
    "Cuddalore",
    "Karur",
    "Neyveli",
    "Ooty",
  ];

  // Amenities list
  const amenitiesList = ["Water", "Electricity", "Park", "Parking", "Pool", "Forest", "Gym", "Security"];

  // State for filters
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  // State for login modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Handle filter button click
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  // Handle okay button click
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

  // Filter properties based on selected filters
  const filteredProperties = properties.filter((property) => {
    // Filter by search query
    if (
      searchQuery &&
      !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by property type
    if (selectedType && property.type !== selectedType) return false;

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

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/buyerlogin');
  };

  return (
    <div className="w-full min-h-screen bg-[#E4E4E4]">
      {/* Navbar */}
      <div className="w-full h-[75px] flex items-center justify-between px-6 bg-white shadow-md">
        <div className="flex-grow flex justify-center md:justify-start">
        <Link to="/home">
      <img src={logo} alt="Logo" className="h-12 w-35 cursor-pointer" />
    </Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/home">
            <button className="flex items-center space-x-2 px-6 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1">
              <FaSignOutAlt className="text-lg" />
              <span>Home</span>
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
              <button
                onClick={() => setSearchQuery(searchQuery)}
                className="text-[#054a91] hover:text-[#032b60]"
              >
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
          <p className="text-center text-gray-500">No properties match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
                <img src={property.image} alt="Land" className="w-full h-48 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-[#054a91] truncate">{property.title}</h2>
                  <p className="text-gray-600 truncate">{property.location}</p>
                  <p className="text-gray-800 font-semibold">₹{property.price}</p>
                  <p className="text-gray-600 truncate">{property.type}</p>
                  <p className="text-gray-600 truncate">{property.size}</p>
                  <p className="text-gray-600 truncate">{property.amenities.join(', ')}</p>
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
                max="1000000"
                step="1000"
                value={selectedPriceRange[0]}
                onChange={(e) => setSelectedPriceRange([Number(e.target.value), selectedPriceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000000"
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
                {tamilNaduCities.map((city, index) => (
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
            <p className="text-gray-600 mb-4">Please log in to view property details.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleLoginClick}
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