import React, { useState } from "react";
import { 
  FaUpload, FaImage, FaMapMarkerAlt, FaDollarSign, FaHome, 
  FaUser, FaAlignLeft, FaPhone, FaBuilding, FaArrowLeft,
  FaParking, FaTree, FaSwimmingPool, FaDumbbell, FaShieldAlt, 
  FaWifi, FaTv, FaUtensils, FaSnowflake 
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo5.png";
import axios from "axios";

const UploadProperty: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        seller_id: 1,
        name: "",
        owner_name: "",
        location: "",
        images: [] as File[],
        price_range: "",
        size: "",
        amenities: [] as string[],
        negotiable: false,
        description: "",
        contacts: "",
        type: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, 10); // Limit to 10 images
            setFormData((prev) => ({
                ...prev,
                images: filesArray,
            }));
        }
    };

    const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            negotiable: e.target.checked,
        }));
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, value]
                : prev.amenities.filter((item) => item !== value),
        }));
    };

    const uploadImagesToCloudinary = async () => {
        const imageUrls: string[] = [];
        const uploadPreset = "property_name"; // Replace with your Cloudinary upload preset
        const cloudName = "dpqjpmqfr"; // Replace with your Cloudinary cloud name

        for (const image of formData.images) {
            const formDataToUpload = new FormData();
            formDataToUpload.append("file", image);
            formDataToUpload.append("upload_preset", uploadPreset);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    formDataToUpload
                );
                const imageUrl = response.data.secure_url;

                if (imageUrl.startsWith(`https://res.cloudinary.com/${cloudName}/`)) {
                    imageUrls.push(imageUrl);
                    console.log("Image uploaded successfully:", imageUrl);
                } else {
                    console.error("Invalid Cloudinary URL:", imageUrl);
                }
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }

        return imageUrls;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.owner_name ||
            !formData.location ||
            formData.images.length === 0 ||
            !formData.price_range ||
            !formData.description ||
            !formData.contacts ||
            !formData.type
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        const uploadedImageUrls = await uploadImagesToCloudinary();
        if (uploadedImageUrls.length === 0) {
            alert("Image upload failed. Please try again.");
            return;
        }

        const propertyData = {
            ...formData,
            images: uploadedImageUrls,
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(propertyData),
            });

            if (response.ok) {
                alert("Property uploaded successfully!");
                setFormData({
                    seller_id: 1,
                    name: "",
                    owner_name: "",
                    location: "",
                    images: [],
                    price_range: "",
                    amenities: [],
                    size: "",
                    negotiable: false,
                    description: "",
                    contacts: "",
                    type: "",
                });
            } else {
                alert("Failed to upload property. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading property:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    const amenitiesList = [
        { name: "Parking", icon: <FaParking className="text-blue-500" /> },
        { name: "Garden", icon: <FaTree className="text-green-500" /> },
        { name: "Pool", icon: <FaSwimmingPool className="text-blue-300" /> },
        { name: "Gym", icon: <FaDumbbell className="text-red-500" /> },
        { name: "Security", icon: <FaShieldAlt className="text-yellow-500" /> },
        { name: "Wi-Fi", icon: <FaWifi className="text-purple-500" /> },
        { name: "TV", icon: <FaTv className="text-teal-500" /> },
        { name: "Kitchen", icon: <FaUtensils className="text-orange-500" /> },
        { name: "Air Conditioning", icon: <FaSnowflake className="text-blue-200" /> },
    ];

    return (
        <div className="w-full min-h-screen bg-[#E4E4E4]">
            {/* Navbar */}
            <div className="w-full h-[75px] flex items-center justify-between px-6 bg-white shadow-md">
                <div className="flex-grow flex justify-center md:justify-start">
                    <Link to="/home">
                        <img src={logo} alt="Logo" className="h-12 w-35 cursor-pointer" />
                    </Link>
                </div>
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center space-x-2 px-6 py-2 rounded-full bg-[#054a91] text-white shadow-md hover:bg-[#032b60] transition duration-300 transform hover:-translate-y-1"
                >
                    <FaArrowLeft className="text-lg" />
                    <span>Back</span>
                </button>
            </div>

            {/* Upload Form */}
            <div className="flex items-center justify-center p-8">
                <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl">
                    <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 flex items-center justify-center gap-3">
                        <FaUpload className="text-blue-500" /> Upload Property
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FaHome className="absolute left-3 top-4 text-gray-400" />
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Property Name" 
                                required 
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <div className="relative">
                            <FaUser className="absolute left-3 top-4 text-gray-400" />
                            <input 
                                type="text" 
                                name="owner_name" 
                                value={formData.owner_name} 
                                onChange={handleChange} 
                                placeholder="Owner's Name" 
                                required 
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                            <input 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                placeholder="Location" 
                                required 
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-4 text-gray-400" />
                            <input 
                                type="text" 
                                name="contacts" 
                                value={formData.contacts} 
                                onChange={handleChange} 
                                placeholder="Phone Number" 
                                required 
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <div className="relative">
                            <FaBuilding className="absolute left-3 top-4 text-gray-400" />
                            <input 
                                type="text" 
                                name="type" 
                                value={formData.type} 
                                onChange={handleChange} 
                                placeholder="Type of Property" 
                                required 
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                            />
                        </div>
                        
                        <div className="relative bg-blue-50 p-4 border-dashed border-2 border-blue-400 rounded-lg">
                            <label className="block font-medium text-gray-700 flex items-center gap-3">
                                <FaImage className="text-blue-500" /> Upload Images
                            </label>
                            <input 
                                type="file" 
                                name="images" 
                                accept="image/*" 
                                multiple 
                                onChange={handleFileChange} 
                                required 
                                className="w-full mt-2" 
                            />
                        </div>
                        
                        <div className="relative">
                            <FaDollarSign className="absolute left-3 top-4 text-gray-400" />
                            <input
                                type="text"
                                name="price_range"
                                value={formData.price_range}
                                onChange={handleChange}
                                placeholder="Price Range"
                                required
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <input
                                type="number"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="Property Size (in sq. feet)"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700">Amenities</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 rounded-lg">
                                {amenitiesList.map((amenity) => (
                                    <label key={amenity.name} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={amenity.name}
                                            checked={formData.amenities.includes(amenity.name)}
                                            onChange={handleAmenitiesChange}
                                            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                        />
                                        <span className="flex items-center gap-2">
                                            {amenity.icon}
                                            {amenity.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <FaAlignLeft className="absolute left-3 top-4 text-gray-400" />
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                placeholder="Description" 
                                required 
                                rows={5} 
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <label className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                name="negotiable" 
                                checked={formData.negotiable} 
                                onChange={handleNegotiableChange} 
                                className="w-5 h-5" 
                            />
                            <span className="text-gray-700">Negotiable Price</span>
                        </label>

                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-600 transition duration-300 shadow-lg transform hover:scale-105"
                        >
                            Upload Property
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadProperty;