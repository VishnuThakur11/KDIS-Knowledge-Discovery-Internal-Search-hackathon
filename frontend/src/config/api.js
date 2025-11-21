// // src/config/api.js
// export const USER_API_ENDPOINT = import.meta.env.VITE_USER_API_ENDPOINT || "http://localhost:5001/api/auth";
// // export const BASE_API = process.env.NODE_ENV === "production"
// //     ? "https://backend-internal-search-vishnu.vercel.app/api/files/uploadPdf"
// //     : "http://localhost:5001/api";

// export const BASE_API = "https://backend-internal-search-vishnu.vercel.app/api/files/uploadPdf"
// export const GET_RECENT_FILES_API = "https://backend-internal-search-vishnu.vercel.app/api/files/recent";


// export const localBackend = "http://localhost:5001";
// export const prodBackend = "https://backend-internal-search-vishnu.vercel.app";

// export const backendURL = import.meta.env.DEV ? localBackend : prodBackend;


// src/config/api.js
export const localBackend = "http://localhost:5001";
export const prodBackend = "https://backend-internal-search-vishnu.vercel.app";

// Automatically pick backend based on environment
export const backendURL = import.meta.env.DEV ? localBackend : prodBackend;

// Build endpoints dynamically
export const USER_API_ENDPOINT = `${backendURL}/api/auth`;
export const UPLOAD_API = `${backendURL}/api/files/uploadPdf`;
export const GET_RECENT_FILES_API = `${backendURL}/api/files/recent`;
