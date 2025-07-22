import React, { useEffect } from "react";
import BreadcrumbNavbar from "../components/BreadcrumbNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { getPersonalTaskDetails } from "../api/apiCalls/personalTaskApi";
import CreatePersonalTaskButton from "../components/CreatePersonalTaskButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetails,
} from "../store/features/personalTaskSlice";
import TaskTab from "../components/TaskTab";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuAlarmClockCheck, LuClipboardList } from "react-icons/lu";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { RiProgress5Line } from "react-icons/ri";
import RefreshButton from "../components/RefreshButton";
import CreateProjectTaskButton from "../components/CreateProjectTaskButton";

const NavLinkRoutes = {
  allTasks: {
    name: "All",
    to: "overview/all-tasks",
    icon: <LuClipboardList />,
    css: "bg-sky-300 hover:bg-sky-400 rounded-lg ",
    active: "bg-base-300 border-2 border-sky-300 ",
  },
  inProgress: {
    name: "In-Progress",
    to: "overview/in-progress-tasks",
    icon: <RiProgress5Line />,
    css: "bg-lime-300 hover:bg-lime-400 rounded-lg",
    active: "bg-base-300 border-2 border-lime-300",
  },
  completedTasks: {
    name: "Completed",
    to: "overview/completed-tasks",
    icon: <FaRegCheckCircle />,
    css: "bg-green-400 hover:bg-green-500 rounded-lg",
    active: "bg-base-300 border-2 border-green-300",
  },
  pendingTasks: {
    name: "Pending",
    to: "overview/pending-tasks",
    icon: <FaRegHourglassHalf />,
    css: "bg-orange-400 hover:bg-orange-500 rounded-lg",
    active: "bg-base-300 border-2 border-orange-400",
  },
  overdueTasks: {
    name: "Overdue",
    to: "overview/overdue-tasks",
    icon: <LuAlarmClockCheck />,
    css: "bg-red-400 hover:bg-red-500 rounded-lg",
    active: "border-2  bg-base-300 border-red-400",
  },
};

const DashboardLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const personalTaskSlice = useSelector((state) => state.personalTask);
  const { refreshToken } = useSelector((state) => state.filter);
  // console.log(personalTaskSlice);

  let title = location.pathname
    .split("/")
    .pop()
    .toUpperCase()
    .replace("-", " ");

  if (title.length === 24) {
    title = `Task Id: ${title}`;
  }

  useEffect(() => {
    const callGetPersonalTaskDetails = async () => {
      const res = await getPersonalTaskDetails();
      if (res && res.success) {
        // console.log(res.data);
        dispatch(addDetails(res.data))
      }
    };
    callGetPersonalTaskDetails();
  }, [dispatch, refreshToken]);

  // console.log(personalTaskSlice);

  return (
    <div className="w-screen lg:w-[calc(100vw-16rem)] ] h-screen overflow-y-scroll scrollbar-hide">
      <BreadcrumbNavbar  tab={"dashboard"}/>
      {/* breadcrumb Navbar */}
      <div className="px-4">
        <div>
          {/* title and create task button */}
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-2xl font-bold">{title}</h1>

            {/* filter and new task button */}
            <div className="flex items-center gap-4 ">
              <CreateProjectTaskButton />
            </div>
          </div>
          {/* tabs */}
          <div className="flex items-center justify-between w-full mt-2">
            <ul className="flex flex-wrap space-x-4 space-y-2 ">
              <TaskTab
                style={NavLinkRoutes.allTasks}
                task={personalTaskSlice?.details?.allTasks}
              />
              <TaskTab
                style={NavLinkRoutes.inProgress}
                task={personalTaskSlice?.details?.inProgressTasks}
              />
              <TaskTab
                style={NavLinkRoutes.completedTasks}
                task={personalTaskSlice.details?.completedTasks}
              />
              <TaskTab
                style={NavLinkRoutes.pendingTasks}
                task={personalTaskSlice?.details?.pendingTasks}
              />
              <TaskTab
                style={NavLinkRoutes.overdueTasks}
                task={personalTaskSlice?.details?.overdueTasks}
              />
            </ul>
            <RefreshButton />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
