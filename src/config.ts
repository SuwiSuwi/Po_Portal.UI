// config.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const ANOTHER_API_BASE_URL = process.env.REACT_APP_ANOTHER_API_BASE_URL || "https://fallback-another-api.com";

// const API_BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://localhost:7047/api"
//     : "https://localhost:7047/api";

if (!API_BASE_URL) {
  // throw new Error("REACT_APP_API_BASE_URL is not defined");
}
export { API_BASE_URL /*, ANOTHER_API_BASE_URL*/ };

//export const PagePerSize = 10; // จำนวนรายการที่แสดงต่อหน้า
