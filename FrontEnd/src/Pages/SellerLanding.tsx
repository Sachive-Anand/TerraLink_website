import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaHome, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { Disclosure } from '@headlessui/react';
import React from "react";
import {Link} from "react-router-dom";

const SellerLandingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const faqs = [
    {
      question: "How do I list my property?",
      answer: "Simply create an account, click on 'List Property', and follow the step-by-step guide to showcase your property to potential buyers."
    },
    {
      question: "What are the fees?",
      answer: "We charge a small commission only when your property is sold. Listing is completely free!"
    },
    {
      question: "How long does it take to sell?",
      answer: "The selling time varies depending on market conditions and property characteristics. On average, properties sell within 2-3 months."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-10">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <FaHome className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold">TerraLink</span>
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <a href="#about" className="text-gray-700 hover:text-primary">About</a>
        <a href="#faq" className="text-gray-700 hover:text-primary">FAQ</a>
        <a href="#contact" className="text-gray-700 hover:text-primary">Contact</a>
        <Link to="/upload">
        <button className="w-full text-left px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition">
          List Your Property
        </button>
      </Link>
        {/* Add the new buttons here */}
        <Link to="/recentapproaches" className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-900 transition">
          Recent Approaches
        </Link>
        <Link to="/terralogs" className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-900 transition">
          Terralogs
        </Link>
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-primary"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>

      {/* Mobile Menu */}
      {isOpen && (
  <div className="md:hidden fixed top-16 w-full bg-white shadow-lg z-10">
    <div className="px-2 pt-2 pb-3 space-y-1">
      <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-primary">About</a>
      <a href="#faq" className="block px-3 py-2 text-gray-700 hover:text-primary">FAQ</a>
      <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-primary">Contact</a>
      <Link to="/upload">
        <button className="w-full text-left px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition">
          List Your Property
        </button>
      </Link>
      {/* Add the new buttons here for mobile */}
      <button className="w-full text-left px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition">
        Recent Approaches
      </button>
      <button className="w-full text-left px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-900 transition">
        Terralogs
      </button>
    </div>
  </div>
)}

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sell Your Property Fast & Easy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect directly with buyers and get the best value for your property
          </p>
          <Link to="/upload"><motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-700 rounded-xl text-white px-8 py-4 text-lg font-semibold hover:bg-blue-900 transition"
          >
            Start Listing Today
          </motion.button></Link>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Direct Connection</h3>
              <p className="text-gray-600">Connect and negotiate directly with potential buyers without intermediaries.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Zero Listing Fee</h3>
              <p className="text-gray-600">List your property completely free. Pay only when you successfully sell.</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-6 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Wide Exposure</h3>
              <p className="text-gray-600">Reach thousands of potential buyers actively looking for properties.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="bg-white rounded-lg shadow">
                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-left">
                      <span className="font-medium">{faq.question}</span>
                      <FaQuestionCircle className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-primary`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <FaPhone className="w-6 h-6 text-primary mr-2" />
              <span className="text-xl">Need help? Call us at 1-800-REALESTATE</span>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-900 transition"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 TerraLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};  

export default SellerLandingPage;

