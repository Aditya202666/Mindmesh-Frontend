import React from "react";
import { NavLink } from "react-router-dom";

const TaskTab = ({ style, task }) => {
  // console.log(task)
  return (
    <NavLink
      to={style.to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-1 rounded-xl btn btn-sm font-semibold shadow  ${
          isActive
            ? style.active
            : ` ${style.css} border text-black border-base-content/50`
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
