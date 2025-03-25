import React, { useState } from "react";
import backgroundVideo from "../assets/video.mp4";
import { FaThumbsUp } from 'react-icons/fa'; // Import Thumbs-Up icon
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading.tsx"; // Import the Loading component

// Define types for form data and error state
interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const BuyerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false); // State for terms acceptance
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

  // Handle input change and update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit based on Sign Up or Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsButtonClicked(true); // Set button clicked state to trigger feedback animation
    setError(""); // Reset error message before validation

    if (isSignUp) {
      // Check if terms and conditions are accepted
      if (!isTermsAccepted) {
        setError("You must accept the terms and conditions to proceed.");
        setIsButtonClicked(false); // Reset button clicked state on failure
        return;
      }

      // Existing sign-up logic...
      if (!formData.name || !formData.phone || !formData.email || !formData.password) {
        setError("All fields are required.");
        setIsButtonClicked(false); // Reset button clicked state on failure
        return;
      }

      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(formData.phone)) {
        setError("Please enter a valid 10-digit mobile number.");
        setIsButtonClicked(false); // Reset button clicked state on failure
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        setError("Please enter a valid email address.");
        setIsButtonClicked(false); // Reset button clicked state on failure
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsButtonClicked(false); // Reset button clicked state on failure
        return;
      }

      // Simulate signup operation
      try {
        const response = await fetch(`http://127.0.0.1:5000/buyer/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          setSignupSuccess(true); // Set success state
          setIsButtonClicked(false); // Reset button clicked state on success
          setFormData({
            name: "",
            phone: "",
            email: "",
            password: "",
          }); // Clear form fields
        } else {
          setError(data.message || "Sign-up failed.");
          setIsButtonClicked(false); // Reset button clicked state on failure
        }
      } catch (error) {
        setError("Error during sign-up: " + error);
        setIsButtonClicked(false); // Reset button clicked state on failure
      }
    } else {
      // Handle login logic...
      try {
        // Step 1: Send POST request to Firebase to authenticate the user
        const firebaseResponse = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN-z-vgr8r5VEG5jNxKDsav7Kwv8wJWNc`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              returnSecureToken: true,
            }),
          }
        );
        const firebaseData = await firebaseResponse.json();

        if (!firebaseResponse.ok) {
          setError(firebaseData.error.message || "Login failed.");
          setIsButtonClicked(false);
          return;
        }

        // Step 2: Send idToken to your own /buyer/login endpoint
        const idToken = firebaseData.idToken;
        const loginResponse = await fetch(`http://127.0.0.1:5000/buyer/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.message === "true") {
          // Step 3: If login is successful, navigate to the ExploreBuyer component
          navigate("/buyerlanding", { state: { user: loginData } });
        } else {
          setError(loginData.message || "Login failed.");
        }
      } catch (error) {
        setError("Error during login: " + error);
      } finally {
        setIsButtonClicked(false);
      }
    }
  };

  // Terms and Conditions Modal
  const TermsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-[#054a91]">Terms and Conditions</h2>
        <p className="text-sm text-gray-600 mb-4">
          This platform is designed exclusively for connecting buyers and sellers. We do not verify the authenticity of properties listed on this platform. Users are advised to exercise due diligence and caution before engaging in any transactions. By using this platform, you agree to the following:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
          <li>You are solely responsible for verifying the authenticity of properties and sellers.</li>
          <li>We are not liable for any financial or legal disputes arising from transactions.</li>
          <li>You must comply with all applicable laws and regulations.</li>
          <li>Your use of this platform is at your own risk.</li>
        </ul>
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full bg-[#054a91] text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );

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
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
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

            {/* Terms and Conditions Checkbox */}
            {isSignUp && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-[#054a91]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#054a91] hover:underline"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>
            )}

            <button
              type="submit"
              className={`w-full bg-[#054a91] text-white py-2 rounded-md hover:bg-blue-800 transition duration-300 ${
                isButtonClicked ? "scale-95" : ""
              }`}
            >
              {isSignUp ? "Register" : "Login"}
            </button>
          </form>

          {signupSuccess && (
            <div className="text-center mt-4">
              <FaThumbsUp className="text-green-500 text-4xl animate-bounce" />
              <p className="text-green-500">Sign-up Successful!</p>
            </div>
          )}

          {!isSignUp && (
            <p className="text-sm text-[#054a91] text-center mt-4 cursor-pointer hover:underline">
              Forgot your password?
            </p>
          )}
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {isModalOpen && <TermsModal />}

      {/* Loading Spinner */}
      {isButtonClicked && <Loading />}
    </div>
  );
};

export default BuyerLogin;