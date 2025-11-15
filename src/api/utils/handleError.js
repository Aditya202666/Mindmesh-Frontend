import { toast } from "react-toastify";

const handleError = (error, notify = true) => {
    const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
    // console.log(`error: ${error}`);
    // console.log(`message: ${message}`);
    if (notify) {
        console.log(error)
    };

    return error.response?.data || { success:false, message }
};

export { handleError };
