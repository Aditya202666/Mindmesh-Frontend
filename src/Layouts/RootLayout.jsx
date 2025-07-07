import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/BreadcrumbNavbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
    return (
        <div className="h-screen flex max-w-screen">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
