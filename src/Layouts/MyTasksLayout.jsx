import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { FiFilter } from "react-icons/fi";
// import CreatePersonalTaskButton from "../components/CreatePersonalTaskButtonButton";
// import Filter from "../components/DateFilter";
import { getTaskOverview } from "../api/apiCalls/personalTaskApi";
import CreatePersonalTaskButton from "../components/CreatePersonalTaskButton";
// import { useSelector } from "react-redux";

let taskCount = {
    allTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
};

const NavLinkRoutes = [
    {
        name: "All Tasks",
        to: "all-tasks",
        icon: "📋",
        count: taskCount.allTasks,
        css: "btn btn-secondary btn-sm rounded-lg",
        // hover: "hover:btn-soft",
        active: "bg-base-300 border-2 text-base-content",
    },
    {
        name: "Completed Tasks",
        to: "completed-tasks",
        icon: "✅",
        count: taskCount.completedTasks,
        css: "btn btn-success btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    {
        name: "Pending Tasks",
        to: "pending-tasks",
        icon: "⏳",
        count: taskCount.pendingTasks,
        css: "btn btn-warning btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    {
        name: "Overdue Tasks",
        to: "overdue-tasks",
        icon: "⏰",
        count: taskCount.overdueTasks,
        css: "btn btn-error btn-sm rounded-lg",
        active: "border-2  bg-base-300 text-base-content",
    },
];

const MyTasksLayout = () => {
    const location = useLocation();

    const setTaskCount = (details ) => {
        console.log(details );
        for (const key in taskCount) {
            console.log(taskCount[key], details[key])
            taskCount[key] = details[key];
        }
    };

    const title = location.pathname
        .split("/")
        .pop()
        .toUpperCase()
        .replace("-", " ");

    useEffect(() => {
        const callGetAllTasks = async () => {
            const res = await getTaskOverview();
            if (res && res.success) {
                setTaskCount(res.data[0].taskDetails);

                // console.log(res.data[0].)
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
                        <CreatePersonalTaskButton />
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
                                    {route.count}
                                </NavLink>
                            ))}
                        </ul>
                        {/* date filter */}
                        {/* <Filter /> */}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyTasksLayout;
