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
import { logoutUser } from "../api/user/authApi";
import { removeUserData } from "../store/features/userSlice";

const truncate = (text, maxChars = 25) =>
    text.length > maxChars ? text.slice(0, maxChars) + "..." : text;

const Sidebar = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const workspaceId = user.id;
    const workspaces = user.workspaces;
    const TABS = [
        { name: "My Tasks", link: "/my-tasks", icon: <FaTasks /> },
        {
            name: "Dashboard",
            link: `/${workspaceId}/dashboard`,
            icon: <MdSpaceDashboard />,
        },
        {
            name: "Inbox",
            link: `/${workspaceId}/inbox`,
            icon: <FaBell />,
        },
        {
            name: "Members",
            link: `/${workspaceId}/members`,
            icon: <FaUserGroup />,
        },
        {
            name: "Settings",
            link: `/${workspaceId}/setting`,
            icon: <IoMdSettings />,
        },
    ];

    const [selectedWorkspace, setSelectedWorkspace] = useState("");
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const handleLogout = async () => {
        const res = await logoutUser();
        if (res && res.success) {
            dispatch(removeUserData());
            navigate("/login", { replace: true });
        }
    };

    const handleSelectWorkspace = (e) => {
        setSelectedWorkspace(e.target.value);
    };

    //todo: add modal for crate new workspace
    //todo:
    return (
        <div className="hidden lg:flex flex-col bg-base-300 h-screen w-2xs px-4 transition-all duration-300">
            {/* select workspace */}
            <div className="relative">
                <fieldset className="fieldset ">
                    <legend className="fieldset-legend  ">Workspace</legend>

                    <FaPlus className="absolute bg-primary p-1 size-4 rounded-full text-primary-content top-2.5 right-0 cursor-pointer hover:bg-secondary active:scale-90" />
                    <select
                        value={selectedWorkspace}
                        onChange={handleSelectWorkspace}
                        className="select rounded-full h-8 cursor-pointer shadow"
                    >
                        <option disabled={true} value={""}>
                            Pick Workspace
                        </option>
                        {workspaces &&
                            workspaces.map((workspace) => (
                                <option value={workspace.id}>
                                    {truncate(workspace.name)}
                                </option>
                            ))}
                    </select>
                </fieldset>
            </div>
            {/* divider */}
            <div className="divider mt-0"></div>
            <ul>
                {TABS.length > 0 ? (
                    TABS.map((tab, index) => (
                        <NavLink
                            key={index}
                            to={tab.link}
                            className={({ isActive }) =>
                                "flex items-center gap-2 font-semibold px-2 py-1  rounded-full " +
                                (isActive
                                    ? " text-secondary-content bg-secondary shadow "
                                    : " hover:bg-secondary/65")
                            }
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
            <fieldset className="relative fieldset ">
                <legend className="fieldset-legend">
                    <div className="flex items-center gap-2">
                        <FaPlus className="absolute bg-primary p-1 size-4 rounded-full text-primary-content top-2 right-0 cursor-pointer hover:bg-secondary active:scale-90" />
                        Projects
                    </div>
                </legend>
                <ul className="overflow-y-auto h-64">
                    {user.projects && user.projects.length > 0 ? (
                        user.projects.map((project) => (
                            <NavLink
                                key={project.id}
                                to={`/${workspaceId}/project/${project.id}`}
                                className={({ isActive }) =>
                                    "flex items-center gap-2 font-semibold px-2 py-1 rounded-full " +
                                    (isActive
                                        ? " text-secondary-content bg-secondary shadow "
                                        : " hover:bg-secondary/65")
                                }
                            >
                                <GoTasklist />
                                {truncate(project.name)}
                            </NavLink>
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-500">
                            No projects available
                        </p>
                    )}
                </ul>
            </fieldset>
            {/* bottom user tab */}
            <div
                className="flex gap-2 mt-auto mb-4 dropdown dropdown-top bg-base-100 border border-base-300 rounded-full shadow cursor-pointer hover:bg-base-200 transition-all"
                tabIndex={0}
                role="button"
            >
                {/* profile pic */}
                <div className="btn btn-ghost btn-circle avatar h-9 w-9 ">
                    <div className="w-8 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user.profilePic}
                        />
                    </div>
                </div>
                {/* username  */}
                <div className="flex flex-col justify-center items-start text-xs font-semibold">
                    <p>{user.fullname}</p>
                    <p className="font-normal">{user.email}</p>
                </div>

                <ul
                    tabIndex={0}
                    className="menu text-xs font-semibold menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    <li>
                        <Link
                            to={"/profile"}
                            className="flex items-center gap-2 "
                        >
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
                        <span className="text-error" onClick={handleLogout}>
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
