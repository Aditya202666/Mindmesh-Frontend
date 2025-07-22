import React from "react";
import { NavLink } from "react-router-dom";

const TaskTab = ({ style, task }) => {
  // console.log(task)
  return (
    <NavLink
      to={style.to}
      className={({ isActive }) =>
        `flex items-center gap-2 py-1 rounded-lg px-2 font-semibold   hover:scale-105 ${
          isActive
            ? "bg-amber-300 text-black shadow shadow-amber-300 "
            : `hover:bg-amber-300/65  hover:text-black`
        }`
      }
    >
      <span className="text-base h-4 flex items-center">{style.icon}</span>
      {style.name}
      {task > 0 ? `(${task})` : ""}
      {""}
    </NavLink>
  );
};

export default TaskTab;
