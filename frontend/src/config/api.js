// src/config/api.js
export const USER_API_ENDPOINT = import.meta.env.VITE_USER_API_ENDPOINT || "http://localhost:5001/api/auth";
export const BASE_API = process.env.NODE_ENV === "production"
    ? "https://backend-internal-search-vishnu.vercel.app/api"
    : "http://localhost:5001/api";
export const GET_RECENT_FILES_API = "http://localhost:5001/api/files/recent";


export const localBackend = "http://localhost:5001";
export const prodBackend = "https://backend-internal-search-vishnu.vercel.app";

export const backendURL = import.meta.env.DEV ? localBackend : prodBackend;