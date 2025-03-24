import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaSignOutAlt } from 'react-icons/fa';
import logo from "../assets/logo5.png";
import { motion } from 'framer-motion';

const BuyerLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fafc] to-[#e2e8f0]">
      {/* Navbar */}
      <nav className="w-full h-20 bg-white shadow-md flex items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <div className="flex items-center">
        <Link to="/home">
      <img src={logo} alt="Logo" className="h-12 w-35 cursor-pointer" />
    </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            to="/exploreBuyer"
            className="text-[#054a91] font-semibold hover:text-[#032b60] transition duration-300"
          >
            Explore
          </Link>
          <Link to="/interested" className="text-[#054a91] font-semibold hover:text-[#032b60] transition duration-300">
             Interested
          </Link>
          <Link
            to="/favorites"
            className="text-[#054a91] font-semibold hover:text-[#032b60] transition duration-300"
          >
            <FaHeart className="inline-block mr-1" />
            Favorites
          </Link>
          <Link
            to="/home"
            className="text-[#054a91] font-semibold hover:text-[#032b60] transition duration-300"
          >
            <FaSignOutAlt className="inline-block mr-1" />
            Logout
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full py-16 px-6 md:px-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-[#054a91] mb-6"
        >
          Welcome to the Buyer Portal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Discover the perfect property tailored to your needs. Whether you're looking for a serene countryside retreat or a bustling commercial space, our platform connects you to the best opportunities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <Link
            to="/exploreBuyer"
            className="px-6 py-3 bg-[#054a91] text-white font-semibold rounded-full hover:bg-[#032b60] transition duration-300 transform hover:scale-105"
          >
            Explore Properties
          </Link>
          <Link
            to="/favorites"
            className="px-6 py-3 border border-[#054a91] text-[#054a91] font-semibold rounded-full hover:bg-[#054a91] hover:text-white transition duration-300 transform hover:scale-105"
          >
            View Favorites
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="w-full py-16 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-[#054a91] text-center mb-12"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#f7fafc] p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-bold text-[#054a91] mb-4">Wide Range of Properties</h3>
              <p className="text-gray-600">
                Explore a diverse selection of properties, from agricultural lands to luxury beachfront plots.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-[#f7fafc] p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-bold text-[#054a91] mb-4">Easy-to-Use Platform</h3>
              <p className="text-gray-600">
                Our intuitive interface makes it easy to find, save, and manage your favorite properties.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-[#f7fafc] p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-bold text-[#054a91] mb-4">Expert Support</h3>
              <p className="text-gray-600">
                Our team of experts is here to guide you every step of the way, ensuring a seamless experience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#054a91] text-white text-center">
        <p className="text-sm">
          &copy; 2025 TerraLink. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default BuyerLanding;