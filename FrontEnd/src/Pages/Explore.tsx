import React from 'react'
import {Link} from "react-router-dom";
import { FaHeart, FaSignOutAlt } from "react-icons/fa";
import {  FaFilter } from "react-icons/fa";

const Explore: React.FC = () => {
  // Placeholder for properties to be displayed later
  interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    image: string;
  }
  const properties: Property[] = [
    {
      id: 1,
      title: "Serene Countryside Land",
      location: "Austin, Texas",
      price: "150,000",
      image: "https://placehold.co/300x200",
    },
    {
      id: 2,
      title: "Lakeside Residential Plot",
      location: "Orlando, Florida",
      price: "200,000",
      image: "https://placehold.co/300x200",
    },
    {
      id: 3,
      title: "Fertile Agricultural Land",
      location: "Fresno, California",
      price: "95,000",
      image: "https://placehold.co/300x200",
    },
    {
      id: 4,
      title: "Commercial Land Near Highway",
      location: "Phoenix, Arizona",
      price: "300,000",
      image: "https://placehold.co/300x200",
    },
    {
      id: 5,
      title: "Luxury Beachfront Plot",
      location: "Miami, Florida",
      price: "750,000",
      image: "https://placehold.co/300x200",
    },
    {
      id: 6,
      title: "Wooded Retreat Land",
      location: "Asheville, North Carolina",
      price: "180,000",
      image: "https://placehold.co/300x200",
    },
  ];  

  return (
    <div className="w-full min-h-screen bg-[#E4E4E4]">
      {/* Navbar */}
      <div className="w-full h-[75px] flex items-center justify-between px-6 bg-white shadow-md">
        {/* Logo */}
        <div className="flex-grow flex justify-center md:justify-start">
          <img src="https://placehold.co/100x50" alt="Logo" className="h-10" />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            to="/favourites"
            className="flex items-center space-x-2 px-5 py-2.5 border border-[#054a91] text-[#054a91] font-semibold rounded-full hover:bg-[#054a91] hover:text-white transition duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <FaHeart className="text-lg" />
            <span>Favourites</span>
          </Link>

          <Link to="/logout">
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
          {/* Left - Description */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-[#054a91]">Explore Lands</h1>
            <p className="text-gray-600">Find the perfect land for your needs. Use the filter to refine your search.</p>
          </div>

          {/* Right - Filter Button */}
          <button className="flex items-center space-x-2 px-5 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1">
            <FaFilter className="text-lg" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Property List Section */}
      <div className="max-w-7xl mx-auto p-6">
        {properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={property.image} alt="Land" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#054a91]">{property.title}</h2>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-gray-800 font-semibold">${property.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

