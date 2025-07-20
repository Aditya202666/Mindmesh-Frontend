import React, { useState } from "react";
import {
  FaBell,
  FaPlus,
  FaSun,
  FaTasks,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { IoMdMoon, IoMdSettings } from "react-icons/io";
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toggleTheme } from "../store/features/themeSlice";
import { logoutUser } from "../api/apiCalls/authApi";
import { removeUserData } from "../store/features/userSlice";
import mindmeshLogo from "../assets/mindmeshLogo.png";
import { getWorkspaceDetails } from "../api/apiCalls/workspaceApi";
import { setWorkspaceDetails } from "../store/features/workspaceSlice";
import CreateWorkspaceButton from "./CreateWorkspaceButton";
import CreateProjectButton from "./CreateProjectButton";


const truncate = (text, maxChars = 25) =>
  text.length > maxChars ? text.slice(0, maxChars) + "..." : text;

const myTasksTab = [
  {
    name: "My Tasks",
    link: "/my-tasks/overview",
    icon: <FaTasks />,
  },
  {
    name: "Inbox",
    link: `/inbox`,
    icon: <FaBell />,
  },
];
const TABS = [
  {
    name: "Dashboard",
    link: `/dashboard`,
    icon: <MdSpaceDashboard />,
  },
  {
    name: "Members",
    link: `/members`,
    icon: <FaUserGroup />,
  },
  {
    name: "Settings",
    link: `/settings`,
    icon: <IoMdSettings />,
  },
];

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const { workspaces, currentWorkspace, projects } = useSelector(
    (state) => state.workspace
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedWorkspace, setSelectedWorkspace] = useState(
    currentWorkspace._id
  );

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

  const handleSelectWorkspace = async (e) => {
    setSelectedWorkspace(e.target.value);
    const res = await getWorkspaceDetails(e.target.value);
    if (res && res.success) {
      // console.log(res.data.members);
      dispatch(setWorkspaceDetails(res.data));
    }
  };

  // console.log(currentWorkspace, projects, workspaces);

  return (
    <div className="hidden lg:flex flex-col bg-base-300 h-screen w-3xs px-4 transition-all duration-300 border-r border-base-content/50 ">
      <div className="flex items-center w-2xs h-10 gap-0">
        <img className="h-10" src={mindmeshLogo} alt="" />
        <h1 className="text-lg font-semibold ">MindMesh</h1>
      </div>

      {/* select workspace */}
      <div className="relative mt-2">
        <fieldset className="fieldset ">
          <legend className="fieldset-legend  ">Workspace</legend>
          <CreateWorkspaceButton
            heading={"Create New Workspace"}
            maxNameLength={50}
          />
          <select
            value={selectedWorkspace}
            onChange={handleSelectWorkspace}
            className="select rounded-xl h-8 cursor-pointer shadow"
          >
            <option disabled={true} value={""}>
              Select Workspace...
            </option>
            {workspaces.length > 0 &&
              workspaces.map((ws) => (
                <option key={ws.workspaceId} value={ws.workspaceId}>
                  {truncate(ws.workspaceName)}
                </option>
              ))}
          </select>
        </fieldset>
      </div>
      {/* divider */}
      <div className="divider mt-0"></div>

      <ul>
        {myTasksTab.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.link}
            className={({ isActive }) =>
              "flex items-center gap-2 font-semibold px-2 py-1 rounded-xl " +
              (isActive
                ? " text-secondary-content bg-sky-300 hover:bg-sky-400 shadow border border-base-content/50"
                : " hover:bg-primary/65")
            }
          >
            {tab.icon}
            {tab.name}
          </NavLink>
        ))}

        {TABS.length > 0 ? (
          TABS.map((tab, index) => (
            <NavLink
              key={index}
              to={tab.link}
              className={({ isActive }) => {
                return (
                  `flex items-center gap-2 font-semibold px-2 py-1 rounded-xl ${
                    currentWorkspace._id === ""
                      ? "pointer-events-none opacity-50"
                      : ""
                  }` +
                  (isActive
                    ? " text-secondary-content bg-sky-300 hover:bg-sky-400 shadow border border-base-content/50"
                    : " hover:bg-primary/65")
                );
              }}
            >
              {tab.icon}
              {tab.name}
            </NavLink>
          ))
        ) : (
          <></>
        )}
      </ul>
      {/* divider */}
      <div className="divider mb-0"></div>

      {/* projects */}
      {currentWorkspace._id !== "" && (
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
                <NavLink
                  key={prj._id}
                  to={`/project/${prj._id}`}
                  className={({ isActive }) =>
                    "flex items-center gap-2 font-semibold px-2 py-1 rounded-xl " +
                    (isActive
                      ? " text-secondary-content bg-secondary shadow border border-base-content/20"
                      : " hover:bg-secondary/65")
                  }
                >
                  <GoTasklist />
                  {truncate(prj.name)}
                </NavLink>
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
        className="flex gap-2 mt-auto mb-4 dropdown dropdown-top bg-base-100 rounded-xl shadow border border-base-content/50 cursor-pointer hover:bg-base-200 transition-all"
        tabIndex={0}
        role="button"
      >
        {/* profile pic */}
        <div className="btn btn-ghost btn-circle avatar h-9 w-9 ">
          <div className="w-8 rounded-xl  ">
            <img alt="Avatar" src={user.profilePic} />
          </div>
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
            <Link to={"/profile"} className="flex items-center gap-2 ">
              {" "}
              <FaUserCircle />
              Profile
            </Link>
          </li>
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
