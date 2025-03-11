import React from "react";
import { Link } from "react-router-dom";
import { FaCompass } from "react-icons/fa";
import logo from "../assets/logo3.png";
import anim from "../assets/animation.png"
const Home:React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#E4E4E4]">
      {/* Navigation Bar */}
      <div className="w-full h-[75px] flex items-center justify-between px-6 bg-white shadow-md">
        {/* Logo */}
        <div className="flex-grow flex justify-center md:justify-start">
          <img src={logo} alt="Logo" className="h-12 w-35" />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            to="/explore"
            className="flex items-center space-x-2 px-5 py-2.5 mr-4 border border-[#054a91] text-[#054a91] font-semibold rounded-full hover:bg-[#054a91] hover:text-white transition duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <FaCompass className="text-lg" />
            <span>Explore</span>
          </Link>

          <Link to="/buyerLogin">
            <button className="flex items-center space-x-2 px-6 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1">
              <FaCompass className="text-lg" />
              <span>Buyer's Portal</span>
            </button>
          </Link>

          <Link to="/sellerLogin">
            <button className="flex items-center space-x-2 px-6 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1">
              <FaCompass className="text-lg" />
              <span>Seller's Portal</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col md:flex-row p-8 space-y-6 md:space-y-0 md:space-x-8">
        {/* About Section */}
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
          <button className="px-6 py-3 rounded-full bg-[#054a91] text-white font-semibold shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1 w-fit mx-auto md:mx-0">
            Learn More
          </button>
        </div>

        {/* Animation Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center order-last md:order-none">
  <img src={anim} alt="Animation" className="w-full max-w-xs md:max-w-lg" />
</div>

      </div>
    </div>
  );
};

export default Home;
