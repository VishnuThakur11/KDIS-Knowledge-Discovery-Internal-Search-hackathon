// src/config/api.js
export const USER_API_ENDPOINT = import.meta.env.VITE_USER_API_ENDPOINT || "http://localhost:5001/api/auth";
export const UPLOAD_API = "http://localhost:5001/api/files/uploadPdf";
export const GET_RECENT_FILES_API = "http://localhost:5001/api/files/recent";