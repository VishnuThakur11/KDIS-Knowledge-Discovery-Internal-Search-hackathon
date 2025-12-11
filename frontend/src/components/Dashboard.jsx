import React, { useRef } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { UPLOAD_API } from "../config/api";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function Dashboard() {
  const fileInputRef = useRef(null);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);

  

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("userId", "12345"); // TODO: Replace with AuthContext user.id
    formData.append("category", "General");
    

    try {
      const res = await axios.post(UPLOAD_API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log("Uploaded:", res.data);
      alert("File uploaded successfully!");

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10 mt-24">

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        className="hidden"
      />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl font-bold"
      >
        Welcome back 👋
      </motion.h1>

      <p className="text-gray-600 mt-2">
        Search through all documents, assets, and internal knowledge.
      </p>

      {/* Search Bar */}
      <div className="mt-6">
        <SearchBar />
      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={handleFileUploadClick}
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 cursor-pointer text-center font-medium"
        >
          Upload File
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 cursor-pointer text-center font-medium"
        >
          Create Folder
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 cursor-pointer text-center font-medium"
        >
          My Favorites
        </motion.div>

        <Link to="/recentfiles"><motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 cursor-pointer text-center font-medium"
        >
          Recent Files
        </motion.div></Link>
      </div>

      {/* Categories */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3">Browse Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Marketing Documents", count: 128 },
            { title: "Design Assets", count: 64 },
            { title: "Product Docs", count: 42 },
          ].map((cat) => (
            <motion.div
              key={cat.title}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold">{cat.title}</h3>
              <p className="text-gray-600 mt-1">{cat.count} items</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3">Your Stats</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Files Uploaded", value: 24 },
            { label: "Searches Made", value: 317 },
            { label: "Favorites", value: 12 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center"
            >
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}