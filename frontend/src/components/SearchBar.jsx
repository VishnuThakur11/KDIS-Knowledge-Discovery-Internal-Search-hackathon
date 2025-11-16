import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert('You’ve been logged out. Please sign in again to continue.')
      navigate("/signin");
      return;
    }
    console.log(token)
    console.log("Search:", query);
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center mt-6 px-4"
    >
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-full shadow-md">

          {/* Input */}
          <input
            type="text"
            placeholder="Search documents, assets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-0 bg-transparent outline-none text-black placeholder-gray-500"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="px-4 py-2 shrink-0 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition"
          >
            Search
          </button>
        </div>
      </div>
    </motion.form>
  );
}