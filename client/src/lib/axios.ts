import axios from "axios";

// export const BASE_URL = "http://localhost:4000/api";
export const BASE_URL = "https://app.wenoxo.in/api";
// export const BASE_URL = "http://15.207.254.223:4000";

const instance = axios.create({
  baseURL: BASE_URL,
});

export { instance as axios };
