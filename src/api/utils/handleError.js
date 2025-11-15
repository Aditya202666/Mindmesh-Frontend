import { toast } from "react-toastify";

const handleError = (error, notify = true) => {
    const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
    // console.log(`error: ${error}`);
    // console.log(`message: ${message}`);
    if (notify) {
        if(error.response?.status === 500) toast("Server Error");
        else toast(message);
    };

    return error.response?.data || { success:false, message }
};

export { handleError };
