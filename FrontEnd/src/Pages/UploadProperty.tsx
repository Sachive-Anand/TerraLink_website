import React, { useState } from "react";
import axios from "axios";
import {
    FaUpload,
    FaImage,
    FaHome,
    FaMoneyBill,
    FaRuler,
    FaPhone,
    FaTree,
    FaSwimmingPool,
    FaDumbbell,
    FaShieldAlt,
    FaWifi,
    FaTv,
    FaUtensils,
    FaSnowflake,
    FaParking,
} from "react-icons/fa";

const UploadProperty: React.FC = () => {
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

                // Validate the URL
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

        // Update the formData state with the uploaded image URLs
        setFormData((prev) => ({
            ...prev,
            images: uploadedImageUrls as unknown as File[], // Temporarily cast to File[] to match the type
        }));

        const propertyData = {
            ...formData,
            images: uploadedImageUrls, // Use the array of URLs for the backend
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

    // Amenities with icons
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
        <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen flex items-center justify-center p-8">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6 flex items-center justify-center gap-3">
                    <FaUpload className="text-blue-500" /> Upload Property
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Property Name */}
                    <div className="relative">
                        <FaHome className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Property Name" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Owner Name */}
                    <div className="relative">
                        <FaHome className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} placeholder="Owner Name" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <FaHome className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Price */}
                    <div className="relative">
                        <FaMoneyBill className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="price_range" value={formData.price_range} onChange={handleChange} placeholder="Price" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Size */}
                    <div className="relative">
                        <FaRuler className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size (sq ft)" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <FaPhone className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="contacts" value={formData.contacts} onChange={handleChange} placeholder="Phone Number" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Property Type */}
                    <div className="relative">
                        <FaHome className="absolute left-3 top-4 text-gray-400" />
                        <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Property Type (e.g., Apartment, House)" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" rows={4} />
                    </div>

                    {/* Upload Images */}
                    <div className="relative bg-blue-50 p-4 border-dashed border-2 border-blue-400 rounded-lg">
                        <label className="block font-medium text-gray-700 flex items-center gap-3">
                            <FaImage className="text-blue-500" /> Upload Images (Max 10)
                        </label>
                        <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} required className="w-full mt-2" />
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Amenities</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {amenitiesList.map((amenity) => (
                                <label key={amenity.name} className="flex items-center gap-2">
                                    <input type="checkbox" name="amenities" value={amenity.name} onChange={handleAmenitiesChange} className="w-5 h-5" />
                                    {amenity.icon}
                                    <span className="text-gray-700">{amenity.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Negotiable Checkbox */}
                    <label className="flex items-center gap-2">
                        <input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleNegotiableChange} className="w-5 h-5" />
                        <span className="text-gray-700">Negotiable Price</span>
                    </label>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-600 transition duration-300 shadow-lg transform hover:scale-105">
                        Upload Property
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadProperty;