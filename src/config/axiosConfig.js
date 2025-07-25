import axios from "axios";

const productionUrl = "https://mindmesh-backend-i3pz.onrender.com/api/v1";
const developmentUrl = "http://localhost:3030/api/v1";

const axiosInstance = axios.create({
    baseURL : productionUrl,
    withCredentials: true,
})

export default axiosInstance