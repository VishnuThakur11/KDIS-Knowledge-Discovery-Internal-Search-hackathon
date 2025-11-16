import React, { useState } from "react";
import UPLOAD_API from "../api/upload";

const UploadBox = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !category) {
      setMessage("Please select a file and category.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("category", category);

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(UPLOAD_API, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload failed");

      setMessage("File uploaded successfully!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm w-[350px]">
      <h3 className="text-lg font-semibold mb-2">Upload File</h3>

      <select
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="policy">Policy</option>
        <option value="training">Training</option>
        <option value="financial">Financial</option>
        <option value="official">Official</option>
      </select>

      <input
        type="file"
        className="mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadBox;