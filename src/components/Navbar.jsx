import React from "react";
import { BiBell } from "react-icons/bi";
import { useSelector } from "react-redux";
import mindmeshLogo from "../assets/mindmeshLogo.png";
const Navbar = () => {
    const user = useSelector((state) => state.user.profilePic);

    return (
        <div className="flex justify-between h-14 items-center px-4 bg-base-200 shadow-sm">
            <div className="flex-1 flex items-center">
                <img
                    className="h-10 hidden md:block"
                    src={mindmeshLogo}
                    alt=""
                />
                <p className="text-xl font-semibold lg:block hidden">
                    Mindmesh
                </p>
            </div>
            <div className="flex-none space-x-2">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <div className="indicator">
                            <BiBell className="size-6" />
                            <span className="badge badge-secondary badge-xs indicator-item">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Profile</a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
