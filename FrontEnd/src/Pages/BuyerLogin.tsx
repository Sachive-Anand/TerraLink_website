import React, { useState } from "react";

const BuyerLogin: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleGoogleLogin = () => {
    alert("Google login will be implemented later.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      alert(`Signing in with Email: ${email}, Password: ${password}`);
    } else {
      alert(`Signing up with Name: ${name}, Email: ${email}, Password: ${password}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4E4E4] p-4">
      <div className="flex flex-col md:flex-row bg-[#054a91] rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Side: Description */}
        <div className="flex-1 p-10 text-white">
          {isSignIn ? (
            <div>
              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="mb-6 text-lg">
                Sign in to access your seller dashboard and manage your products, orders, and
                customers.
              </p>
              <button
                onClick={toggleForm}
                className="mt-6 bg-white text-[#054a91] py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300 font-semibold"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
              <p className="mb-6 text-lg">
                Sign up to start selling your products and reach millions of customers worldwide.
              </p>
              <button
                onClick={toggleForm}
                className="mt-6 bg-white text-[#054a91] py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300 font-semibold"
              >
                Already have an account? Sign In
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 bg-white p-10 rounded-l-3xl">
          <h2 className="text-3xl font-bold mb-8 text-[#054a91] text-center">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isSignIn && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054a91]"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054a91]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054a91]"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#054a91] text-white py-3 rounded-lg hover:bg-[#04396c] transition duration-300 font-semibold"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            {isSignIn ? "Sign In" : "Sign Up"} with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;