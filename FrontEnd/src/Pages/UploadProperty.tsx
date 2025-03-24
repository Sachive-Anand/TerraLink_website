import React, { useState } from "react";
import { FaUpload, FaImage, FaMapMarkerAlt, FaDollarSign, FaHome, FaUser, FaAlignLeft, FaPhone, FaBuilding, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo5.png";

const UploadProperty: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        propertyName: "",
        ownerName: "",
        location: "",
        images: [] as File[],
        Price: "",
        size: '',
        amenities: [] as string[],
        negotiable: false,
        description: "",
        phoneNumber: "",
        propertyType: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            const { checked } = e.target;
    
            setFormData((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev.amenities, value]
                    : prev.amenities.filter((item: string) => item !== value)
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                images: Array.from(e.target.files),
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            negotiable: e.target.checked,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.propertyName || !formData.ownerName || !formData.location || formData.images.length === 0 || !formData.Price || !formData.description || !formData.phoneNumber || !formData.propertyType) {
            alert("Please fill in all required fields.");
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("propertyName", formData.propertyName);
        formDataToSubmit.append("ownerName", formData.ownerName);
        formDataToSubmit.append("location", formData.location);
        formData.images.forEach((image) => formDataToSubmit.append("images", image));
        formDataToSubmit.append("Price", formData.Price);
        formDataToSubmit.append('size', formData.size);
        formDataToSubmit.append('amenities', formData.amenities.join(',')); 
        formDataToSubmit.append("negotiable", String(formData.negotiable));
        formDataToSubmit.append("description", formData.description);
        formDataToSubmit.append("phoneNumber", formData.phoneNumber);
        formDataToSubmit.append("propertyType", formData.propertyType);

        try {
            const response = await fetch("/api/upload-property", {
                method: "POST",
                body: formDataToSubmit,
            });

            if (response.ok) {
                alert("Property uploaded successfully!");
                setFormData({
                    propertyName: "",
                    ownerName: "",
                    location: "",
                    images: [],
                    Price: "",
                    amenities: [],
                    size: '',
                    negotiable: false,
                    description: "",
                    phoneNumber: "",
                    propertyType: ""
                });
            } else {
                alert("Failed to upload property. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading property:", error);
            alert("An error occurred. Please try again later.");
        }
    };

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
                <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl transform transition duration-500 hover:scale-105">
                    <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 flex items-center justify-center gap-3">
                        <FaUpload className="text-blue-500" /> Upload Property
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <FaHome className="absolute left-3 top-4 text-gray-400" />
                            <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} placeholder="Property Name" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-4 text-gray-400" />
                            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Owner's Name" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div className="relative">
                            <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-4 text-gray-400" />
                            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div className="relative">
                            <FaBuilding className="absolute left-3 top-4 text-gray-400" />
                            <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Type of Property" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div className="relative bg-blue-50 p-4 border-dashed border-2 border-blue-400 rounded-lg">
                            <label className="block font-medium text-gray-700 flex items-center gap-3">
                                <FaImage className="text-blue-500" /> Upload Images (.png format)
                            </label>
                            <input type="file" name="images" accept=".png" multiple onChange={handleFileChange} required className="w-full mt-2" />
                        </div>
                        <div className="relative">
                            <FaDollarSign className="absolute left-3 top-4 text-gray-400" />
                            <input
                                type="text"
                                name="expectedPrice"
                                value={formData.Price}
                                onChange={handleChange}
                                placeholder="Price"
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
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border p-3 rounded-lg shadow-sm">
                                {[
                                    { label: "🏋️ Gym", value: "Gym" },
                                    { label: "🚗 Parking", value: "Parking" },
                                    { label: "🏊 Swimming Pool", value: "Swimming Pool" },
                                    { label: "🌿 Garden", value: "Garden" },
                                    { label: "🏡 Clubhouse", value: "Clubhouse" },
                                    { label: "🔒 24/7 Security", value: "24/7 Security" },
                                    { label: "⚡ Power Backup", value: "Power Backup" },
                                    { label: "🎠 Kids Play Area", value: "Kids Play Area" },
                                    { label: "🛗 Lift", value: "Lift" },
                                    { label: "📹 CCTV Surveillance", value: "CCTV" },
                                    { label: "📶 High-Speed WiFi", value: "WiFi" },
                                    { label: "🏀 Sports Complex", value: "Sports Complex" }
                                ].map((amenity) => (
                                    <label key={amenity.value} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={amenity.value}
                                            checked={formData.amenities.includes(amenity.value)}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                                        />
                                        <span>{amenity.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleCheckboxChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label className="text-gray-700">Negotiable</label>
                        </div>
                        <div className="relative">
                            <FaAlignLeft className="absolute left-3 top-4 text-gray-400" />
                            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required rows={5} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r bg-[#054a91] text-white font-semibold py-3 rounded-lg hover:from-blue-900  transition duration-300 shadow-lg transform hover:scale-105">
                            Upload Property
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadProperty;