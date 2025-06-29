import React, { useEffect } from "react";
import BreadcrumbNavbar from "../components/BreadcrumbNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { getTaskOverview } from "../api/apiCalls/personalTaskApi";
import CreatePersonalTaskButton from "../components/CreatePersonalTaskButton";
import { useDispatch, useSelector } from "react-redux";
import {
    addDetails,
    addDueInSevenDays,
    addOverdueLastMonth,
    addRecentTask,
} from "../store/features/personalTaskSlice";
import TaskTab from "../components/TaskTab";
import Filters from "../components/Filters";

const NavLinkRoutes = {
    allTasks: {
        name: "All Tasks",
        to: "overview/all-tasks",
        icon: "📋",
        css: "btn btn-secondary btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    completedTasks: {
        name: "Completed Tasks",
        to: "overview/completed-tasks",
        icon: "✅",
        css: "btn btn-success btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    pendingTasks: {
        name: "Pending Tasks",
        to: "overview/pending-tasks",
        icon: "⏳",
        css: "btn btn-warning btn-sm rounded-lg",
        active: "bg-base-300 border-2 text-base-content",
    },
    overdueTasks: {
        name: "Overdue Tasks",
        to: "overview/overdue-tasks",
        icon: "⏰",
        css: "btn btn-error btn-sm rounded-lg",
        active: "border-2  bg-base-300 text-base-content",
    },
};

const MyTasksLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const personalTaskSlice = useSelector((state) => state.personalTask);

    const title = location.pathname
        .split("/")
        .pop()
        .toUpperCase()
        .replace("-", " ");

    useEffect(() => {
        const callGetTaskOverview = async () => {
            const res = await getTaskOverview();
            if (res && res.success) {
                dispatch(addDueInSevenDays(res.data.dueInSevenDays));
                dispatch(addOverdueLastMonth(res.data.overdueLastMonth));
                dispatch(addRecentTask(res.data.recentTask));
                dispatch(addDetails(res.data.taskDetails));
                // console.log("data ", res.data);
            }
        };
        callGetTaskOverview();
    }, [dispatch]);

    // console.log(personalTaskSlice);

    return (
        <div className="w-screen lg:w-[calc(100vw-16rem)] ]">
            <BreadcrumbNavbar />
            {/* breadcrumb Navbar */}
            <div className="px-4">
                <div>
                    {/* title and create task button */}
                    <div className="flex items-center justify-between mt-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <CreatePersonalTaskButton />
                    </div>
                    <div className="flex items-center justify-between w-full mt-2">
                        <ul className="flex gap-4 ">
                            <TaskTab
                                style={NavLinkRoutes.allTasks}
                                task={
                                    personalTaskSlice.allTasks.length > 0
                                        ? personalTaskSlice.allTasks.length
                                        : personalTaskSlice.details.allTasks
                                }
                            />
                            <TaskTab
                                style={NavLinkRoutes.completedTasks}
                                task={
                                    personalTaskSlice.completedTasks > 0
                                        ? personalTaskSlice.completedTasks
                                              .length
                                        : personalTaskSlice.details
                                              .completedTasks
                                }
                            />
                            <TaskTab
                                style={NavLinkRoutes.pendingTasks}
                                task={
                                    personalTaskSlice.pendingTasks > 0
                                        ? personalTaskSlice.pendingTasks.length
                                        : personalTaskSlice.details.pendingTasks
                                }
                            />
                            <TaskTab
                                style={NavLinkRoutes.overdueTasks}
                                task={
                                    personalTaskSlice.overdueTasks > 0
                                        ? personalTaskSlice.overdueTasks.length
                                        : personalTaskSlice.details.overdueTasks
                                }
                            />
                        </ul>
                        { title !== 'OVERVIEW' && <Filters/>}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyTasksLayout;
