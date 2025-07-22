import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiCalendarDateRange } from "react-icons/hi2";

const BreadcrumbNavbar = ({ tab}) => {
  const location = useLocation();
  // console.log(location.pathname);
  const pathname = location.pathname.split("/").slice(2);

  const date = new Date().toDateString();
  // console.log(date);

  return (
    <div className="lg:flex items-center justify-between px-4 hidden lg:w-[calc(100vw-16rem)] h-10 bg-base-200 border-b border-base-content/50">
      {/* <div>
        {pathname.length > 0 &&
          pathname.map((path, index) => {
            const fullPath =
              `/${tab}/` + pathname.slice(0, index + 1).join("/");
            const label = isNaN(path)
              ? path.charAt(0).toUpperCase() + path.slice(1)
              : path; // Skip capitalizing IDs

            return (
              <span key={index} className=" font-semibold">
                <Link to={fullPath}>{label}</Link>
                {index < pathname.length - 1 && (
                  <span className="mx-1">{">"}</span>
                )}
              </span>
            );
          })}
      </div> */}

      <div className="flex items-center gap-1 mr-1 ml-auto">
        {date}
        <HiCalendarDateRange />
      </div>
    </div>
  );
};

export default BreadcrumbNavbar;
