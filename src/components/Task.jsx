import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  changePersonalTaskStatusToInProgress,
  deleteTask,
} from "../api/apiCalls/personalTaskApi";

import { MdDeleteForever } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImNewTab } from "react-icons/im";
import { HiCalendarDateRange } from "react-icons/hi2";
import { TiAttachment } from "react-icons/ti";
import { increaseRefreshToken } from "../store/features/filterSlice";
import { TbPick } from "react-icons/tb";
import { GoGoal } from "react-icons/go";
import { RiTriangularFlagFill } from "react-icons/ri";

const truncate = (str, num = 30) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bgColors, priorityBadges, statusBadges } = useSelector(
    (state) => state.theme
  );

  const handleDeleteTask = async () => {
    const res = await deleteTask(task._id);
    if (res && res.success) {
      console.log(res);
      dispatch(increaseRefreshToken());
    }
  };

  const handlePickUpTask = async () => {
    const res = await changePersonalTaskStatusToInProgress(task._id);
    if (res && res.success) {
      dispatch(increaseRefreshToken());
    }
  };

  const handleMarkAsCompleted = async () => {
    const res = await markAsCompletedPersonalTask(task._id);
    if (res && res.success) {
      console.log(res);
      dispatch(increaseRefreshToken());
    }
  };

  const dueDate = new Date(task.dueDate?.split("T")[0]).toDateString();
  // const day  = dueDate?.split("-")
  console.log(task);
  return (
    <div
      className={
        "hover:shadow-base-content shadow transition-all  relative flex flex-col space-y-2 min-w-[16.5rem] max-w-3xs bg- h-60 border border-base-content/50  rounded-xl p-2 text-black " +
        bgColors[task.color]
      }
    >
      <div
        className="dropdown dropdown-end absolute right-0 top-2 "
        tabIndex={0}
        role="button"
      >
        <div className={" bg-transparent m-1 p-0 border-0 "}>
          <BsThreeDotsVertical
            className={`text-lg hover:scale-110 text-black transition-all `}
          />
        </div>
        <ul className="menu text-base-content dropdown-content bg-base-100 p-1 border border-base-content/50 rounded-md z-1 w-40 text-xs font-medium p ">
          <li>
            <Link to={`/my-tasks/${task._id}`}>
              <ImNewTab />
              Open
            </Link>
          </li>
          <li>
            <Link
              to={`/my-tasks/${task._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <LuBookOpen />
              Open in New Tab
            </Link>
          </li>
          {task?.status === "To-do" && (
            <li onClick={handlePickUpTask}>
              <div>
                <TbPick /> PickUp Task
              </div>
            </li>
          )}

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

      {/* priority and status */}
      <div className="">
        <span className="text-xs label pr-1">Priority: </span>
        <span
          className={`badge badge-sm border-black/50 text-black font-semibold  ${
            priorityBadges[task.priority]
          }`}
        >
          {task.priority}
        </span>
        <span className="text-xs label pl-2 pr-1">Status: </span>

        <span
          className={`badge badge-sm border-black/50 text-black font-semibold ${
            statusBadges[task.status]
          }`}
        >
          {task.status}
        </span>
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

      {/* project name */}

      {/*  footer */}
      <div className="flex flex-col gap-1.5 mt-auto items-baseline ">
        <div className="flex items-center gap-1">
          <RiTriangularFlagFill className="size-3 " />

          {task.project ? (
            <span className="text-xs font-semibold hover:underline cursor-pointer" onClick={()=>navigate(`/my-tasks/project/${task.project._id}`)}>
              {truncate(task.project.name)}
            </span>
          ) : (
            <span className="text-xs font-semibold">NA</span>
          )}
        </div>
        <div className="flex w-full ">
          {/* open icon */}
          <Link
            to={`/my-tasks/${task._id}`}
            // target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 hover:underline transition-all"
          >
            <ImNewTab
              className="size-3 cursor-pointer"
              title="Open"
            />
            <span className="text-xs">open</span>
          </Link>

          {/* date */}
          <span className="flex items-center text-xs ml-auto font-semibold">
            <HiCalendarDateRange />
            {task.dueDate ? `${dueDate}` : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
