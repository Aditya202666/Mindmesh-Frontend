import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../api/apiCalls/personalTaskApi";

import { MdDeleteForever } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { ImNewTab } from "react-icons/im";

const bgColors = {
  Yellow: "bg-secondary",
  Blue: "bg-primary",
  Coral: "bg-accent",
  Grey: "bg-neutral",
};

const contentColor = {
  Yellow: "text-secondary-content",
  Blue: "text-primary-content",
  Coral: "text-accent-content",
  Grey: "text-neutral-content",
};

const priorityBadges = {
  None: "badge-neutral",
  Low: "badge-info",
  Medium: "badge-warning",
  High: "badge-error",
};

const statusBadges = {
  "To-do": "badge-neutral ",
  "In-Progress": "badge-info",
  Completed: "badge-success",
};

//todo: add all functionality of tasks

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    const res = deleteTask(task._id);
    if (res && res.success) {
      dispatch(removeTask(task._id));
    }
  };

  return (
    <div
      className={
        "relative space-y-4 min-w-3xs max-w-3xs  h-60 border border-base-content/20  rounded-xl p-2 " +
        bgColors[task.color] +
        " " +
        contentColor[task.color]
      }
    >
      <details className="dropdown dropdown-end absolute right-0 top-0 ">
        <summary
          className={"btn btn-sm btn-ghost bg-transparent m-1 p-0 border-0 "}
        >
          <BsThreeDotsVertical
            className={`text-lg hover:text-black/70 ${
              contentColor[task.color]
            }`}
          />
        </summary>
        <ul className="menu dropdown-content bg-base-300 border border-base-content/20 rounded-box z-1 w-40 text-xs font-medium p-0 ">
          <li>
            <Link to={`/my-tasks/overview/${task._id}`}>
              <LuBookOpen /> Open
            </Link>
          </li>
          <li>
            <Link
              to={"/my-tasks/:taskId"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImNewTab />
              Open in New Tab
            </Link>
          </li>
          <li>
            <a>
              {" "}
              <FaRegCheckCircle />
              Mark as Completed
            </a>
          </li>
          <li
            onClick={handleDeleteTask}
            className="text-error hover:text-error-content hover:bg-error  rounded-md"
          >
            <a>
              {" "}
              <MdDeleteForever /> Delete
            </a>
          </li>
        </ul>
      </details>
      <div
        className={"flex flex-col gap-2 h-  w-full " + contentColor[task.color]}
      >
        <h1 className="line-clamp-2 text-sm font-medium w-15/16 leading-tight">
          {task.title} Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Maxime eum quod consectetur cupiditate in impedit perferendis
          perspiciatis minus? Illo obcaecati magnam provident necessitatibus
          beatae! Enim inventore provident soluta explicabo nisi!
        </h1>
        <p className="line-clamp-4 text-xs leading-tight">
          {task.description} Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Rerum debitis ratione labore fugiat deserunt amet dolor? Ut id,
          ex dolore, est nam consectetur qui hic obcaecati quisquam dolorem sed
          assumenda!
        </p>
      </div>
      <div className="flex space-x-2 text-sm">
        <div>
          <span className=" text-xs">Status:</span>
          <span
            className={
              "badge badge-sm ml-1 border border-black " +
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
              "badge badge-sm ml-1 border border-black " +
              priorityBadges[task.priority]
            }
          >
            {` ` + task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
