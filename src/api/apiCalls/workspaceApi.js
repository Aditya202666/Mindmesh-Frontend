import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosConfig";
import { handleError } from "../utils/handleError";
import getHeaderToken from "../utils/getHeaderToken";


const createWorkspace = async (data) => {
  try {
    const cookie = getHeaderToken();

    const res = await axiosInstance.post("/workspace/create", data, cookie);
    console.log(res);
    if (res) {
      toast(res.data.message);
      return res.data;
    }
  } catch (error) {
    handleError(error);
  }
};


export {
    createWorkspace
}