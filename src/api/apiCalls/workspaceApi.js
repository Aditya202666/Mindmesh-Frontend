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

const getAllWorkspaces = async () => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.get("/workspace/all", cookie);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const getWorkspaceDetails = async (id) => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.get(`/workspace/${id}`, cookie);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const createProject = async (id, name) => {
  try {
    const cookie = getHeaderToken();

    const res = await axiosInstance.post(`/workspace/${id}/project`, { name }, cookie);
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
    createWorkspace,
    getAllWorkspaces,
    getWorkspaceDetails,
    createProject
}