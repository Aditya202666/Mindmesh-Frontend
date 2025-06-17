import React, { useState } from "react";
import { FaBell, FaPlus, FaTasks, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const truncate = (text, maxChars = 25) =>
    text.length > maxChars ? text.slice(0, maxChars) + "..." : text;

const Sidebar = () => {
    const user = useSelector((state) => state.user);
    const workspaceId = user.id;
    const workspaces = user.workspaces;
    const TABS = [
        { name: "My Tasks", link: "/", icon: <FaTasks /> },
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

    const handleSelectWorkspace = (e) => {
        setSelectedWorkspace(e.target.value);
    };

    //todo: add modal for crate new workspace
    //todo:
    return (
        <div className="hidden lg:block bg-base-300 h-[calc(100vh-3.5rem)] w-3xs px-4 transition-all duration-300">
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
            <fieldset className="relative fieldset">
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
            <span className="absolute bottom-5 shadow bg-base-100 px-2 py-1 rounded-full ">
                {user.email}
            </span>
        </div>
    );
};

export default Sidebar;
