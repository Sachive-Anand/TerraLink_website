import React, { useState } from "react";
import backgroundVideo from "../assets/video.mp4";

// Define types for form data and error state
interface FormData {
  name: string;
  mobileNumber: string;
  email: string;
  password: string;
}

const BuyerLogin: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  // Handle input change and update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit based on Sign Up or Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (isSignUp) {
      if (!formData.name || !formData.mobileNumber || !formData.email || !formData.password) {
        setError("All fields are required.");
        return;
      }

      // Simulate a signup operation (replace with actual API call)
      try {
        const response = await fetch(`http://localhost:3000/buyer/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        // Handle successful sign-up (e.g., redirect or show success message)
      } catch (error) {
        setError("Error during sign-up: " + error);
      }
    } else {
      if (!formData.email || !formData.password) {
        setError("Email and password are required.");
        return;
      }

      // Simulate a login operation (replace with actual API call)
      try {
        const response = await fetch(`http://localhost:3000/buyer/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const data = await response.json();
        console.log(data);
        // Handle successful login (e.g., redirect or show success message)
      } catch (error) {
        setError("Error during login: " + error);
      }
    }
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
            {isSignUp ? "Join as a Buyer!" : "Welcome Back, Buyer!"}
          </h2>
          <p className="mb-6">
            {isSignUp
              ? "Create your buyer account to start your journey with us."
              : "Sign in to manage your buyer dashboard and orders."}
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
            {isSignUp ? "Buyer Registration" : "Buyer Login"}
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            {isSignUp ? "Register with your email" : "Login with your credentials"}
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Google Sign-In */}
          <div className="flex justify-center mb-4">
            {isSignUp ? (
              <button className="flex items-center px-4 py-2 border rounded-md shadow-md hover:bg-gray-100 transition duration-300">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                Sign Up with Google
              </button>
            ) : (
              <button className="flex items-center px-4 py-2 border rounded-md shadow-md hover:bg-gray-100 transition duration-300">
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                Sign In With Google
              </button>
            )}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
              />
            )}
            {isSignUp && (
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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

export default BuyerLogin;
