import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { getAllWorkspaces } from "../api/apiCalls/workspaceApi";
import { useDispatch } from "react-redux";
import { addAllWorkspaces } from "../store/features/workspaceSlice";

const RootLayout = () => {
  const dispatch = useDispatch();
  // const { workspaceRefreshToken } = useSelector((state) => state.filter);

  useEffect(() => {
    const callGetAllWorkspaces = async () => {
      const res = await getAllWorkspaces();

      if (res && res.success) {
        // console.log(res.data)
        dispatch(addAllWorkspaces(res.data));
      }
    };

    callGetAllWorkspaces();
  }, []);

//   console.log(workspaces);

  return (
    <div className="h-screen flex max-w-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
