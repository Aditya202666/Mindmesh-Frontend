import React from "react";
import { BiBell, BiExit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import mindmeshLogo from "../assets/mindmeshLogo.png";
import { logoutUser } from "../api/user/authApi";
import { MdLogout } from "react-icons/md";
import { toggleTheme } from "../store/features/themeSlice";
import { FaSun, FaUserCircle } from "react-icons/fa";
import { IoMdMoon } from "react-icons/io";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
const Navbar = () => {
    const user = useSelector((state) => state.user.profilePic);
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="flex justify-between h-14 items-center px-4 bg-base-200 shadow-sm">
            {/* hamburger menu  */}
            <div className="flex-1 flex items-center lg:hidden">
                <FiMenu
                    className="size-6 cursor-pointer"
                    alt=""  
                />
            </div>
            <div className="flex-1 flex items-center">
                <img
                    className="h-10 hidden md:block"
                    src={mindmeshLogo}
                    alt=""
                />
                <p className="text-xl font-semibold md:block hidden">
                    Mindmesh
                </p>
            </div>
            <div className="flex-none space-x-2">
                <div className="dropdown dropdown-end hidden md:inline-block">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <div className="indicator">
                            <BiBell className="size-6" />
                            <span className="badge badge-primary badge-xs indicator-item">
                                8
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">
                                    View cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end border-2  rounded-full">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar size-8 "
                    >
                        <div className="w-8 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu text-xs font-semibold menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to={"/profile"}
                            className="flex items-center gap-2 ">
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
        </div>
    );
};

export default Navbar;
