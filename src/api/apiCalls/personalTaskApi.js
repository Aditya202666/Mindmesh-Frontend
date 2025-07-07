import { toast } from "react-toastify";
import axiosInstance from "../../config/axiosConfig";
import { handleError } from "../utils/handleError";
import getHeaderToken from "../utils/getHeaderToken";

const createTask = async (data) => {
  try {
    const cookie = getHeaderToken();

    const res = await axiosInstance.post("/personalTask/create", data, cookie);
    // console.log(res.data);
    if (res) {
      toast(res.data.message);
      return res.data;
    }
  } catch (error) {
    handleError(error);
  }
};

const getTaskOverview = async () => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.get("/personalTask/overview", cookie);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const getAllTasks = async (filter) => {
  try {
    const cookie = getHeaderToken();
    // console.log(cookie);
    const config = {
      params: { ...filter },
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

const getOneTask = async (id) => {
  try {
    const cookie = getHeaderToken();
    // console.log(cookie);

    const res = await axiosInstance.get(`/personalTask/${id}`, cookie);

    if (res) {
      return res.data;
    }
  } catch (error) {
    handleError(error);
  }
};

const deleteTask = async (id) => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.delete(`/personalTask/${id}`, cookie);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const addPersonalTaskChecklist = async (data) => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.post(
      `/personalTask/${data.id}/sub-task`,
      { title: data.title },
      cookie
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const markAsCompletedPersonalTaskChecklist = async (id, subId) => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.patch(
      `/personalTask/${id}/${subId}/completed`,
      {},
      cookie
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

const markAsCompletedPersonalTask = async (id) => {
  try {
    const cookie = getHeaderToken();
    const res = await axiosInstance.patch(
      `/personalTask/${id}/completed`,
      {},
      cookie
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export {
  createTask,
  getAllTasks,
  getOneTask,
  getTaskOverview,
  markAsCompletedPersonalTask,
  markAsCompletedPersonalTaskChecklist,
  addPersonalTaskChecklist,
  deleteTask,
};
