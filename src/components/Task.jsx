import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../api/apiCalls/personalTaskApi";

import { MdDeleteForever } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImNewTab } from "react-icons/im";
import { HiCalendarDateRange } from "react-icons/hi2";
import { TiAttachment } from "react-icons/ti";


//todo: add all functionality of task menu
//todo: remove attachments icon
//todo: fix checklist


const Task = ({ task}) => {
  const dispatch = useDispatch();
  const {bgColors, priorityBadges, statusBadges} = useSelector(state => state.theme)

  const handleDeleteTask = async () => {
    const res = deleteTask(task._id);
    if (res && res.success) {
      dispatch(removeTask(task._id));
    }
  };

  const dueDate = new Date(task.dueDate?.split("T")[0]).toDateString();
  // const day  = dueDate?.split("-")

  return (
    <div
      className={
        "relative flex flex-col space-y-2 min-w-[16.5rem] max-w-3xs bg- h-60 border border-base-content/50  rounded-xl p-2 text-black " +
        bgColors[task.color]
      }
    >
      <details className="dropdown dropdown-end absolute right-0 top-0 ">
        <summary
          className={"btn btn-sm btn-ghost bg-transparent m-1 p-0 border-0 "}
        >
          <BsThreeDotsVertical
            className={`text-lg hover:scale-110 transition-all `}
          />
        </summary>
        <ul className="menu dropdown-content bg-base-100 p-1 border border-base-content/50 rounded-md z-1 w-40 text-xs font-medium p ">
          <li>
            <Link to={`/my-tasks/overview/${task._id}`}>
              <LuBookOpen /> Open
            </Link>
          </li>
          <li>
            <Link
              to={`/my-tasks/overview/${task._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImNewTab />
              Open in New Tab
            </Link>
          </li>
          {task.status !== "Completed" && (
            <li>
              <a>
                {" "}
                <FaRegCheckCircle />
                Mark as Completed
              </a>
            </li>
          )}
          <li onClick={handleDeleteTask} className="text-red-500 rounded-md">
            <a>
              {" "}
              <MdDeleteForever /> Delete
            </a>
          </li>
        </ul>
      </details>
      {/* Badges */}
      <div className="flex space-x-1 text-sm ">
        <div>
          <span className=" text-xs">Status:</span>
          <span
            className={
              "badge badge-sm text-black ml-1 border border-black font-semibold " +
              statusBadges[task.status]
            }
          >
            {` ` + task.status}
          </span>
        </div>
        <div>
          <span className=" text-xs">Priority:</span>
          <span
            className={
              "badge badge-sm ml-1 text-black border border-black font-semibold " +
              priorityBadges[task.priority]
            }
          >
            {` ` + task.priority}
          </span>
        </div>
      </div>

      {/* title and desc */}
      <div className={"flex flex-col gap-2 mt-1 w-full "}>
        <h1 className="line-clamp-2 text-sm font-medium w-15/16 leading-tight">
          {task.title}
        </h1>
        <p className="line-clamp-4 text-xs leading-tight">{task.description}</p>
      </div>
      {/* checklist */}
      <div className="flex gap-1.5 line-clamp-1 items-center">
        <div className="line-clamp-1 flex space-x-1.5">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={` h-2 w-5 border rounded-lg ${
                  index+1 <= 3 ? "bg-success" : "bg-warning"
                }`}
              ></span>
            ))}
        </div>
        <span className="text-xs font-semibold">{`(3/5)`}</span>
      </div>

      <div className="flex items-center gap-1 text-sm font-semibold border border-base-content/20 bg-base-300/50 rounded-lg w-fit pr-1">
        <TiAttachment className="size-5" />
        {2}
      </div>

      {/*  date */}
      <div className="flex mt-auto items-baseline">
        <Link
          to={`/my-tasks/overview/${task._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImNewTab
            className="size-3 hover:scale-110 transition-all cursor-pointer"
            title="Open in new tab"
          />
        </Link>

        <span className="flex items-center text-xs ml-auto font-semibold">
          <HiCalendarDateRange />
          {task.dueDate ? `${dueDate}` : "NA"}
        </span>
      </div>
    </div>
  );
};

export default Task;
