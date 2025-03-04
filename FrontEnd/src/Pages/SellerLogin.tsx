import React, { useState } from "react";
import backgroundVideo from "../assets/video.mp4";

const SignInSignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

<<<<<<< HEAD
=======
const SellerLogin:React.FC = () => {
>>>>>>> c9c283f75678392407bdcf0ee1fc383895ea3025
  return (
    <div className="relative flex items-center justify-center min-h-screen ">
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
      
      <div className="relative w-full max-w-3xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side (Styled for both modes) */}
        <div
          className={`w-full md:w-1/2 p-6 flex flex-col justify-center transition-all ${
            isSignUp
              ? "order-2 bg-gradient-to-r from-[#054a91] to-blue-700 text-white"
              : "order-1 bg-gradient-to-r from-[#054a91] to-cyan-600 text-white"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            {isSignUp ? "Hello, Friend!" : "Welcome Back!"}
          </h2>
          <p className="text-center mb-6">
            {isSignUp
              ? "Enter your personal details to start your journey with us"
              : "To keep connected with us, please log in with your personal info"}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="border border-white px-6 py-2 rounded-full bg-white text-[#054a91] hover:bg-transparent hover:text-white transition"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {/* Right Side */}
        <div
          className={`w-full md:w-1/2 p-6 transition-all ${
            isSignUp ? "order-1" : "order-2 bg-gray-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignUp ? "Create Account" : "Sign In"}
          </h2>

     

          <p className="text-center text-gray-500 text-sm mb-4">
            or use your {isSignUp ? "email for registration" : "account"}
          </p>

          {/* Form */}
          <form className="space-y-4">
            {isSignUp && (
              <input
                type="text"
                placeholder="Name"
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
              className="w-full bg-[#054a91] text-white py-2 rounded-md hover:bg-blue-800 transition"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
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

export default SignInSignUp;
