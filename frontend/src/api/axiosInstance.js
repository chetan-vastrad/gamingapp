import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gamingapp-f72a.onrender.com/api",
});

export default axiosInstance;
