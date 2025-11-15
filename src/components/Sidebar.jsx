import { useEffect, } from "react";
import {
  FaRegCheckCircle,
  FaSun,
  FaTasks,
} from "react-icons/fa";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { IoMdMoon } from "react-icons/io";
import {
  MdLogout,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { toggleTheme } from "../store/features/themeSlice";
import { logoutUser } from "../api/apiCalls/authApi";
import { removeUserData } from "../store/features/userSlice";
import mindmeshLogo from "../assets/mindmeshLogo.png";
import CreateProjectButton from "./CreateProjectButton";
import {
  LuAlarmClockCheck,
  LuClipboardList,
} from "react-icons/lu";
import { RiProgress5Line } from "react-icons/ri";
import { getPersonalTaskDetails } from "../api/apiCalls/personalTaskApi";
import { addDetails } from "../store/features/personalTaskSlice";
import TaskTab from "./TaskTab";
import EditProjectButton from "./EditProjectButton";

const myTasksTab = {
  dashboard: {
    name: "Dashboard",
    to: "/my-tasks/overview",
    icon: <FaTasks />,
  },
  allTasks: {
    name: "All",
    to: "/my-tasks/all-tasks",
    icon: <LuClipboardList className="size-4" />,
  },
  inProgress: {
    name: "In-Progress",
    to: "/my-tasks/in-progress-tasks",
    icon: <RiProgress5Line className="size-4" />,
  },
  completedTasks: {
    name: "Completed",
    to: "/my-tasks/completed-tasks",
    icon: <FaRegCheckCircle className="size-4" />,
  },
  pendingTasks: {
    name: "Pending",
    to: "/my-tasks/pending-tasks",
    icon: <FaRegHourglassHalf className="size-4" />,
  },
  overdueTasks: {
    name: "Overdue",
    to: "/my-tasks/overdue-tasks",
    icon: <LuAlarmClockCheck className="size-4" />,
  },
};

const truncate = (str, num = 25) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const { projects, details } = useSelector((state) => state.personalTask);
  const { refreshToken } = useSelector((state) => state.filter);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res && res.success) {
      dispatch(removeUserData());
      //   todo remove all the data from the store
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const callGetPersonalTaskDetails = async () => {
      const res = await getPersonalTaskDetails();
      if (res && res.success) {
        // console.log(res.data);
        dispatch(addDetails(res.data));
      }
    };
    callGetPersonalTaskDetails();
  }, [dispatch, refreshToken]);

  return (
    <div className="hidden lg:flex flex-col bg-base-300 h-screen w-3xs px-4 transition-all duration-300 border-r border-base-content/50 ">
      <div className="flex items-center w-2xs h-10 gap-0">
        <img className="h-10" src={mindmeshLogo} alt="" />
        <h1 className="text-lg font-semibold ">MindMesh</h1>
      </div>

      <div className="divider mb-0"></div>
      <ul className="mt-2 ml-2  space-y-1 ">
        <TaskTab style={myTasksTab.dashboard} task={0} />
        <TaskTab style={myTasksTab.allTasks} task={details?.allTasks} />
        <TaskTab
          style={myTasksTab.inProgress}
          task={details?.inProgressTasks}
        />
        <TaskTab
          style={myTasksTab.completedTasks}
          task={details?.completedTasks}
        />
        <TaskTab style={myTasksTab.pendingTasks} task={details?.pendingTasks} />
        <TaskTab style={myTasksTab.overdueTasks} task={details?.overdueTasks} />
      </ul>
      {/* divider */}
      <div className="divider mb-0"></div>

      {/* projects */}
      {projects && (
        <fieldset className="relative fieldset ">
          <legend className="fieldset-legend">
            <div className="flex items-center gap-2">
              <CreateProjectButton
                heading={"Create New Project"}
                maxNameLength={50}
              />
              Projects
            </div>
          </legend>

          <ul className="overflow-y-auto h-64">
            {projects && projects.length > 0 ? (
              projects.map((prj) => (
                <div className="flex items-center gap-1 group" key={prj._id}>
                  <EditProjectButton project={prj} />
                  <NavLink
                    
                    to={`/my-tasks/project/${prj._id}`}
                    className={({ isActive }) =>
                      "flex items-center gap-2 font-semibold px-2 py-1 rounded-lg w-full " +
                      (isActive
                        ? " text-secondary-content bg-secondary shadow border border-base-content/20"
                        : " hover:bg-secondary/65")
                    }
                  >
                    {truncate(prj.name)}
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                No projects available
              </p>
            )}
          </ul>
        </fieldset>
      )}
      {/* bottom user tab */}

      <div
        className="flex gap-2 mt-auto mb-4 dropdown dropdown-top bg-base-100 rounded-lg shadow border border-base-content/50 cursor-pointer hover:bg-base-200 transition-all"
        tabIndex={0}
        role="button"
      >
        {/* profile pic */}
        <div className="btn btn-ghost btn-circle avatar h-9 w-9  ml-1">
          <img
            alt="Avatar"
            src={user.profilePic}
            className="rounded-full object-cover"
          />
        </div>
        {/* username  */}
        <div className="flex flex-col justify-center items-start text-xs font-semibold">
          <p>{user.fullname}</p>
          <p className="font-normal">{user.email}</p>
        </div>

        <ul
          tabIndex={0}
          className="menu text-xs font-semibold menu-sm dropdown-content bg-base-100 border-r-base-300 rounded-box z-1 mb-2 w-52 p-2 shadow-lg"
        >
          <li>
            <span onClick={handleToggleTheme}>
              <span className="flex items-center gap-2">
                {theme.theme === "dark" ? (
                  <>
                    <FaSun className="text-yellow-500" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <IoMdMoon className="text-gray-800" />
                    Dark Mode
                  </>
                )}
              </span>
            </span>
          </li>
          <li>
            <span className="text-red-500" onClick={handleLogout}>
              {" "}
              <MdLogout /> Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
