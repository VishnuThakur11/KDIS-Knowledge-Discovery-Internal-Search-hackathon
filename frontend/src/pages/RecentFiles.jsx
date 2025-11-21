import React,{ useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FileText, Clock } from "lucide-react";
import { backendURL } from "../config/api";

export default function RecentFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/files/recent`);
        setFiles(res.data); // API returns array
      } catch (error) {
        console.error("Fetch recent files error:", error);
      }
    };

    fetchRecentFiles();
  }, []);

  return (
    <div className="p-6 md:p-12 mt-24 min-h-screen bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold">Recent Files</h1>
      <p className="text-gray-600 mt-2 mb-8">
        Your most recently uploaded or accessed files.
      </p>

      {/* Empty State */}
      {files.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <FileText size={50} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No recent files found</p>
          </div>
        </div>
      ) : (
        /* Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <motion.div
              key={file._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200 hover:shadow-xl cursor-pointer group transition"
            >
              {/* File Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <FileText size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {file.fileName.length > 25
                      ? file.fileName.slice(0, 25) + "..."
                      : file.fileName}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock size={14} className="mr-1" />
                    {new Date(file.createdAt).toLocaleString()}
                    
                  </div>
                  <br />
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    uploaded by:{}
                  </div>
                </div>
              </div>

              {/* Footer + Button */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  {file.fileType.replace("application/", "").toUpperCase()}
                </p>

                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Open
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}