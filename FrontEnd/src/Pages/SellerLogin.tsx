import React, { useState } from "react";
import backgroundVideo from "../assets/video.mp4";
import { FaThumbsUp, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading.tsx";

interface FormData {
  businessName: string;
  contactNumber: string;
  email: string;
  password: string;
}

const SellerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    contactNumber: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsButtonClicked(true);
    setError("");

    if (isSignUp) {
      if (!isTermsAccepted) {
        setError("You must accept the terms and conditions to proceed.");
        setIsButtonClicked(false);
        return;
      }

      if (!formData.businessName || !formData.contactNumber || !formData.email || !formData.password) {
        setError("All fields are required.");
        setIsButtonClicked(false);
        return;
      }

      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(formData.contactNumber)) {
        setError("Please enter a valid 10-digit contact number.");
        setIsButtonClicked(false);
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        setError("Please enter a valid business email address.");
        setIsButtonClicked(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsButtonClicked(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/seller/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.businessName,
            contact: formData.contactNumber
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSignupSuccess(true);
          setIsButtonClicked(false);
          setFormData({
            businessName: "",
            contactNumber: "",
            email: "",
            password: "",
          });
        } else {
          setError(data.message || "Seller registration failed.");
          setIsButtonClicked(false);
        }
      } catch (error) {
        setError("Error during seller registration: " + error);
        setIsButtonClicked(false);
      }
    } else {
      try {
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
          setError(firebaseData.error.message || "Seller login failed.");
          setIsButtonClicked(false);
          return;
        }

        const idToken = firebaseData.idToken;
        const loginResponse = await fetch(`http://127.0.0.1:5000/seller/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.message === "true") {
          navigate("/seller-dashboard", { state: { user: loginData } });
        } else {
          setError(loginData.message || "Seller login failed.");
        }
      } catch (error) {
        setError("Error during seller login: " + error);
      } finally {
        setIsButtonClicked(false);
      }
    }
  };

  const TermsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-[#054a91]">Seller Agreement</h2>
        <p className="text-sm text-gray-600 mb-4">
          By registering as a seller, you agree to the following terms governing property listings and transactions:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-2">
          <li><strong>Professional Representation:</strong> You must provide accurate business information and represent your properties truthfully.</li>
          <li><strong>Property Ownership:</strong> You warrant you have legal authority to list and sell each property.</li>
          <li><strong>Listing Accuracy:</strong> All property details, including pricing, features, and availability must be current and precise.</li>
          <li><strong>Pricing Integrity:</strong> Clearly disclose all costs including commissions, fees, and taxes.</li>
          <li><strong>Media Standards:</strong> Provide high-quality, recent photos and truthful descriptions.</li>
          <li><strong>Response Time:</strong> Respond to buyer inquiries within 24 business hours.</li>
          <li><strong>Transaction Compliance:</strong> All sales must adhere to local real estate laws and regulations.</li>
          <li><strong>Commission Structure:</strong> A 2% platform fee applies to completed transactions.</li>
          <li><strong>Content License:</strong> You grant us rights to display your property content while maintaining your ownership.</li>
          <li><strong>Account Security:</strong> Maintain confidentiality of your login credentials.</li>
        </ul>
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full bg-[#054a91] text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
        >
          Accept Terms
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen">
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

      <div className="relative w-full max-w-3xl flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden">
        <div
          className={`w-full md:w-1/2 p-6 flex flex-col justify-center transition-transform duration-500 ease-in-out transform ${
            isSignUp ? "-translate-x-full md:translate-x-0 order-2" : "order-1"
          } bg-gradient-to-r from-[#054a91] to-blue-700 text-white text-center`}
        >
          <h2 className="text-2xl font-bold mb-4">
            {isSignUp ? "Join Our Seller Network" : "Seller Portal"}
          </h2>
          <p className="mb-6">
            {isSignUp
              ? "Register your real estate business to access qualified buyers"
              : "Manage your property listings and connect with serious buyers"}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="border border-white px-6 py-2 rounded-full bg-white text-[#054a91] hover:bg-transparent hover:text-white transition duration-300"
          >
            {isSignUp ? "Existing Seller? Sign In" : "New Seller? Register"}
          </button>
        </div>

        <div
          className={`w-full md:w-1/2 p-6 transition-transform duration-500 ease-in-out transform ${
            isSignUp ? "translate-x-full md:translate-x-0 order-1" : "order-2 bg-gray-50"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignUp ? "Seller Registration" : "Seller Login"}
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            {isSignUp ? "Create your professional seller account" : "Access your seller dashboard"}
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                name="businessName"
                placeholder="Business/Company Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
              />
            )}
            {isSignUp && (
              <input
                type="text"
                name="contactNumber"
                placeholder="Business Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#054a91]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

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
                    Seller Agreement
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
              {isSignUp ? "Register as Seller" : "Access Seller Portal"}
            </button>
          </form>

          {signupSuccess && (
            <div className="text-center mt-4">
              <FaThumbsUp className="text-green-500 text-4xl animate-bounce" />
              <p className="text-green-500">Seller account created successfully!</p>
              <p className="text-sm text-gray-600 mt-2">You can now list your properties</p>
            </div>
          )}

          {!isSignUp && (
            <p className="text-sm text-[#054a91] text-center mt-4 cursor-pointer hover:underline">
              Forgot your password?
            </p>
          )}
        </div>
      </div>

      {isModalOpen && <TermsModal />}
      {isButtonClicked && <Loading />}
    </div>
  );
};

export default SellerLogin;