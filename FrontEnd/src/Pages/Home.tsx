import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-[#E4E4E4]">
      {/* Navigation Bar */}
      <div className="w-full h-[75px] flex items-center justify-between px-4 bg-white shadow-md">
        {/* Logo - Centered initially, moves left when compressed */}
        <div className="flex-grow flex justify-center md:justify-start">
          <img src="https://placehold.co/100x50" alt="Logo" className="h-10" />
        </div>

        {/* Buttons - Always on the right */}
        <div className="flex space-x-4">
          <Link to="/BuyerLogin">
            <button className="bg-[#054a91] bg-opacity-75 text-white px-4 py-2 rounded-2xl hover:bg-[#054a91] transition duration-300">
              Buyer's Portal
            </button>
          </Link>
          <Link to="/SellerLogin">
            <button className="bg-[#054a91] bg-opacity-75 text-white px-4 py-2 rounded-2xl hover:bg-[#054a91] transition duration-300">
              Seller's Portal
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content - Initially Side-by-Side, Then Stacked */}
      <div className="w-full min-h-screen flex flex-col md:flex-row p-8 space-y-6 md:space-y-0 md:space-x-8">
        {/* About Section (Initially Left, Moves to Top when Compressed) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#054a91]">
            Welcome to TerraLink
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            TerraLink is your trusted partner for all real estate needs. We
            specialize in the brokerage of land, houses, rental properties, and
            more. Whether you're looking to buy, sell, or rent, TerraLink
            connects you with the best opportunities in the market.
          </p>
          <button className="bg-[#054a91] bg-opacity-75 text-white px-6 py-3 rounded-2xl hover:bg-[#054a91] transition duration-300 w-fit mx-auto md:mx-0">
            Learn More
          </button>
        </div>

        {/* Animation Section (Initially Right, Moves to Bottom on Small Screens) */}
        <div className="w-full md:w-1/2 flex items-center justify-center order-last md:order-none">
          <p className="text-2xl font-extrabold text-gray-800 text-center">
            Responsive Animation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
