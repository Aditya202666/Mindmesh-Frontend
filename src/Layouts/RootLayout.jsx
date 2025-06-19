import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
    return (
        <div className="h-screen flex">
            {/* <Navbar /> */}
            {/* <div className="flex "> */}
                <Sidebar />
                <Outlet />
            {/* </div> */}
        </div>
    );
};

export default RootLayout;
