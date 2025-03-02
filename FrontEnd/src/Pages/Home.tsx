import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#E4E4E4]">
      {/* Navigation Bar */}
      <div className="w-full h-[75px] flex items-center justify-between px-4 bg-white shadow-md">
        <div className="w-1/2"></div>
        <div className="flex justify-center flex-grow">
          <img
            src="https://placehold.co/100x50"
            alt="Logo"
            className="h-10"
          />
        </div>
        <div className="w-1/2 flex justify-end space-x-4">
          <button className="bg-[#054a91] bg-opacity-75 text-white px-4 py-2 rounded-2xl hover:bg-[#054a91] transition duration-300">
           <Link to="/BuyerLogin"> Buyer's Portal</Link>
          </button>
          <button className="bg-[#054a91] bg-opacity-75 text-white px-4 py-2 rounded-2xl hover:bg-[#054a91] transition duration-300">
           <Link to="/SellerLogin"> Seller's Portal</Link>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col md:flex-row p-8">
        {/* Introduction Section (Left Side) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#054a91]">
            Welcome to TerraLink
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            TerraLink is your trusted partner for all real estate needs. We specialize in the brokerage of land, houses, rental properties, and more. Whether you're looking to buy, sell, or rent, TerraLink connects you with the best opportunities in the market.
          </p>
          <button className="bg-[#054a91] bg-opacity-75 text-white px-6 py-3 rounded-2xl hover:bg-[#054a91] transition duration-300 w-fit">
            Learn More
          </button>
        </div>

        {/* Animation Section (Right Side) */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <p className="text-2xl font-extrabold text-gray-800">
            Responsive Animation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;