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
import { increaseRefreshToken } from "../store/features/filterSlice";


const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { bgColors, priorityBadges, statusBadges } = useSelector(
    (state) => state.theme
  );

  const handleDeleteTask = async () => {
    const res = await deleteTask(task._id);
    if (res && res.success) {
      console.log(res)
      dispatch(increaseRefreshToken());
    }
  };

  const handleMarkAsCompleted = async () => {
    const res = await markAsCompletedPersonalTask(task._id);
    if (res && res.success) {
      console.log(res)
      dispatch(increaseRefreshToken());
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
      <div className="dropdown dropdown-end absolute right-0 top-0 "
        tabIndex={0}
        role="button"
      >
        <div
          className={"btn btn-sm btn-ghost bg-transparent m-1 p-0 border-0 "}
        >
          <BsThreeDotsVertical
            className={`text-lg hover:scale-110 transition-all `}
          />
        </div>
        <ul className="menu dropdown-content bg-base-100 p-1 border border-base-content/50 rounded-md z-1 w-40 text-xs font-medium p ">
          <li>
            <Link to={`/my-tasks/overview/${task._id}`}>
              <ImNewTab />
              Open
            </Link>
          </li>
          <li>
            <Link
              to={`/my-tasks/overview/${task._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <LuBookOpen />
              Open in New Tab
            </Link>
          </li>
          {task.status !== "Completed" && (
            <li onClick={handleMarkAsCompleted}>
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
      </div>
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
      {task.subTasks.length > 0 && (
        <>
          <div className="text-xs leading-0 mt-2 label">Checklist:</div>
          <div className="flex gap-1.5 line-clamp-1 items-center">
            <div className="line-clamp-1 flex space-x-1.5">
              {task.subTasks.length > 0 &&
                task.subTasks.map((subTask, index) => (
                  <span
                    key={subTask._id}
                    className={` h-2 w-5 border rounded-lg ${
                      index + 1 <= task.completedSubTasks
                        ? "bg-green-400"
                        : "bg-orange-400"
                    }`}
                  ></span>
                ))}
            </div>
            <span className="text-xs font-semibold">{`(${task.completedSubTasks}/${task.totalSubTasks})`}</span>
          </div>
        </>
      )}

      {/*  footer */}
      <div className="flex mt-auto items-baseline">
        {/* open icon */}
        <Link
          to={`/my-tasks/overview/${task._id}`}
          // target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-0.5 hover:underline transition-all"
        >
          <ImNewTab className="size-3 cursor-pointer" title="Open in new tab" />
          <span className="text-xs">open</span>
        </Link>

        {/* date */}
        <span className="flex items-center text-xs ml-auto font-semibold">
          <HiCalendarDateRange />
          {task.dueDate ? `${dueDate}` : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default Task;

