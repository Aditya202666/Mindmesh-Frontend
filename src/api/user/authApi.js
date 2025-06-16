import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosConfig";
import { handleError } from "../utils/handleError";
import getHeaderToken from "../utils/getHeaderToken";

const registerUser = async (data) => {
    try {
        const res = await axiosInstance.post("/auth/register", data);

        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const loginUser = async (data) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);

        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const getAccountVerificationOtp = async () => {
    try {
        const cookie = getHeaderToken();
        // console.log(cookie)
        const res = await axiosInstance.get("/auth/account-otp", cookie);
        console.log(res);
        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const verifyAccount = async (otp) => {
    try {
        const cookie = getHeaderToken();
        const res = await axiosInstance.post(
            "/auth/verify-account-otp",
            otp,
            cookie
        );
        console.log(res);
        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const refreshToken = async () => {
    try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log(res);
        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const logoutUser = async () => {
    try {
        const cookie = getHeaderToken();
        const res = await axiosInstance.post("/auth/logout", {}, cookie);

        if (res) {
            toast(res.data.message);
            return res.data;
        }
    } catch (error) {
        handleError(error);
    }
};

const getForgotPasswordOtp = async (email) => {
    try {
        const res = await axiosInstance.post("/auth/password-otp", email);

        if (res) {
            toast(res.data.message);
        }
    } catch (error) {
        handleError(error);
    }
};

const verifyForgotPasswordOtp = async (data) => {
    try {
        const res = await axiosInstance.post("/auth/verify-password-otp", data);

        if (res) {
            toast(res.data.message);
            return res.data
        }
    } catch (error) {
        handleError(error);
    }
};

export {
    registerUser,
    loginUser,
    getAccountVerificationOtp,
    verifyAccount,
    refreshToken,
    logoutUser,
    getForgotPasswordOtp,
    verifyForgotPasswordOtp,
};
