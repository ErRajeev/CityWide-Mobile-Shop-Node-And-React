import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "http://65.2.134.87:5000",
});

export default axiosInstance;
