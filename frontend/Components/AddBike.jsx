// AddBikeForm.jsx
import React, { useState } from "react";
import axiosInstance from "../axios/axios"; // your axios setup
import { useNavigate } from "react-router-dom";

const AddBikeForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle file selection
//   const handleFilesChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 4) {
//       alert("You can only upload up to 4 images");
//       return;
//     }
//     setImages(files);
//   };


const handleFilesChange = (e) => {
  const files = Array.from(e.target.files);
  setImages((prev) => {
    const combined = [...prev, ...files];
    return combined.slice(0, 4); // max 4 images
  });
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || images.length === 0) {
      alert("Please fill all fields and add at least 1 image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    images.forEach((img, index) => formData.append("images", img));

    try {
      setLoading(true);
      const res = await axiosInstance.post("/bikes/addbike", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Bike added successfully!");
      setName("");
      setPrice("");
      setImages([]);
      navigate("/bikes"); // redirect to bikes page
    } catch (err) {
      console.error(err);
      alert("Error adding bike: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Bike</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Bike Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFilesChange}
          className="border px-3 py-2 rounded"
        />
        <small className="text-gray-500">Max 4 images</small>

        <button
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Bike"}
        </button>
      </form>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddBikeForm;
