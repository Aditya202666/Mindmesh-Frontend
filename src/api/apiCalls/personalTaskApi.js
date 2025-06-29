import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosConfig";
import { handleError } from "../utils/handleError";
import getHeaderToken from "../utils/getHeaderToken";

const createTask = async (data) => {
    try {
        const cookie = getHeaderToken();

        const res = await axiosInstance.post(
            "/personalTask/create",
            data,
            cookie
        );
        // console.log(res.data);
        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }   
};

const getTaskOverview = async()=>{
    try {
        const cookie = getHeaderToken()
        const res = await axiosInstance.get("/personalTask/overview", cookie)
        return res.data
    } catch (error) {
        handleError(error)
    }
}

const getAllTasks = async (filter) => {
    try {
        const cookie = getHeaderToken();
        // console.log(cookie);
        const config = {
            params: {...filter},
            ...cookie,
        };
        const res = await axiosInstance.get("/personalTask/all", config);
        if (res) {
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

export { createTask, getAllTasks, getTaskOverview };
