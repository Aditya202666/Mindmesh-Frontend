import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosConfig";
import { handleError } from "../utils/handleError";
import getHeaderToken from "../utils/getHeaderToken";

const registerUser = async (data) => {
    try {
        const res = await axiosInstance.post("/auth/register", data);

        toast(res.data.message);

        return res.data;
    } catch (error) {
        handleError(error);
    }
};

const loginUser = async(data)=>{
    try {
        const res = await axiosInstance.post('/auth/login', data)
        
        toast(res.data.message)
        return res.data

    } catch (error) {
        handleError(error)
    }
}

const logoutUser = async () => {
    try {
        const cookie = getHeaderToken();
        const res = await axiosInstance.post("/auth/logout", {}, cookie);

        return res.data.success
    } catch (error) {
        handleError(error);
    }
};


export { registerUser,loginUser, logoutUser };
