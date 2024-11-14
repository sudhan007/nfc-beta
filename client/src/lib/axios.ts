import axios from "axios";

// export const BASE_URL = "http://localhost:4000/api";
// export const BASE_URL = "https://app.wenoxo.in/api";
export const BASE_URL = "https://nfc-beta.onrender.com/api";
//  export const BASE_URL = "http://localhost:4000/api";
const instance = axios.create({
  baseURL: BASE_URL,
});

export { instance as axios };
