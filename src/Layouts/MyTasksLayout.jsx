import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import CreatePersonalTask from "../components/CreatePersonalTask";
import Filter from "../components/DateFilter";
import { getAllTasks } from "../api/apiCalls/personalTaskApi";
import { useSelector } from "react-redux";

const NavLinkRoutes = [
    {
        name: "All Tasks",
        to: "all-tasks",
        icon: "📋",
        css: "btn btn-secondary btn-sm rounded-lg",
        // hover: "hover:btn-soft",
        active: "bg-base-300 border-2 text-base-content",
    },
    {
        name: "Completed Tasks",
        to: "completed-tasks",
        icon: "✅",
        css: "btn btn-success btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    {
        name: "Pending Tasks",
        to: "pending-tasks",
        icon: "⏳",
        css: "btn btn-warning btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    {
        name: "Overdue Tasks",
        to: "overdue-tasks",
        icon: "⏰",
        css: "btn btn-error btn-sm rounded-lg",
        active: "border-2  bg-base-300 text-base-content",
    },
];



const MyTasksLayout = () => {
    const location = useLocation();
    const { page, fromDate, limit } = useSelector((state) => state.filter);

    const title = location.pathname
        .split("/")
        .pop()
        .toUpperCase()
        .replace("-", " ");

    useEffect(() => {
        const snapShot = { page, limit, fromDate };
        const callGetAllTasks = async () => {
            const res = await getAllTasks(snapShot);
            if (res && res.success) {
                console.log("All tasks fetched successfully:", res.data);
            }
        };
        callGetAllTasks();
    }, []);

    return (
        <div className="w-full">
            <Navbar />
            {/* second navbar */}
            <div className=" px-4 py-2 ">
                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <CreatePersonalTask />
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                        <ul className="flex gap-4 ">
                            {NavLinkRoutes.map((route, index) => (
                                <NavLink
                                    key={index}
                                    to={`overview/${route.to}`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-1 rounded-xl font-semibold shadow ${
                                            route.css
                                        } ${isActive ? route.active : ``}`
                                    }
                                >
                                    <span className="text-base ">
                                        {route.icon}
                                    </span>
                                    {route.name}
                                </NavLink>
                            ))}
                        </ul>
                        {/* date filter */}
                        <Filter />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyTasksLayout;
