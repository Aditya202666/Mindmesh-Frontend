import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";

const RootLayout = () => {
  const dispatch = useDispatch();
  // const { workspaceRefreshToken } = useSelector((state) => state.filter);


//   console.log(workspaces);

  return (
    <div className="h-screen flex max-w-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
