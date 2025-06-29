import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNavbar = () => {
    const location = useLocation();
    // console.log(location.pathname);
    const pathname = location.pathname.split("/").slice(2);

    return (
        <div className="lg:flex items-center px-4 hidden lg:w-[calc(100vw-16rem)] h-10 bg-base-200 border-b border-base-content/20">
            {pathname.length > 0 &&
                pathname.map((path, index) => {
                    const fullPath =
                        "/my-tasks/" + pathname.slice(0, index + 1).join("/");
                    const label = isNaN(path)
                        ? path.charAt(0).toUpperCase() + path.slice(1)
                        : path; // Skip capitalizing IDs

                    return (
                        <span
                            key={index}
                            className=" font-semibold"
                        >
                            <Link to={fullPath}>
                             {label}
                             </Link>
                            {index < pathname.length - 1 && (
                                <span className="mx-1">{">"}</span>
                            )}
                        </span>
                    );
                })}
        </div>
    );
};

export default BreadcrumbNavbar;
