import React, { useState } from "react";
import backgroundVideo from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";
const SellerLogin: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    navigate("/sellerlanding"); // Navigate to the buyer landing page
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Container */}
      <div className="relative w-full max-w-3xl flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side (Info Box) */}
        <div
          className={`w-full md:w-1/2 p-6 flex flex-col justify-center transition-transform duration-500 ease-in-out transform ${
            isSignUp ? "-translate-x-full md:translate-x-0 order-2" : "order-1"
          } bg-gradient-to-r from-[#054a91] to-blue-700 text-white text-center`}
        >
          <h2 className="text-2xl font-bold mb-4">
            {isSignUp ? "Join as a Seller!" : "Welcome Back, Seller!"}
          </h2>
          <p className="mb-6">
            {isSignUp
              ? "Create your seller account to start your journey with us."
              : "Sign in to manage your seller dashboard and orders."}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="border border-white px-6 py-2 rounded-full bg-white text-[#054a91] hover:bg-transparent hover:text-white transition duration-300"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {/* Right Side (Form Box) */}
        <div
          className={`w-full md:w-1/2 p-6 transition-transform duration-500 ease-in-out transform ${
            isSignUp ? "translate-x-full md:translate-x-0 order-1" : "order-2 bg-gray-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignUp ? "Seller Registration" : "Seller Login"}
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            {isSignUp ? "Register with your email" : "Login with your credentials"}
          </p>

          {/* Google Sign-In */}
          <div className="flex justify-center mb-4">
          {isSignUp ? (<button className="flex items-center px-4 py-2 border rounded-md shadow-md hover:bg-gray-100 transition duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
              Sign Up with Google
            </button>):(<button className="flex items-center px-4 py-2 border rounded-md shadow-md hover:bg-gray-100 transition duration-300">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
              Sign In With Google
            </button>)}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Business Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
            />

            <button
              type="submit"
              className="w-full bg-[#054a91] text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
            >
              {isSignUp ? "Register" : "Login"}
            </button>
          </form>

          {!isSignUp && (
            <p className="text-sm text-[#054a91] text-center mt-4 cursor-pointer hover:underline">
              Forgot your password?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;