import React from 'react'
import { NavLink } from 'react-router-dom'

const TaskTab = ({style, task }) => {
    // console.log(task)
  return (
            <NavLink
                to={style.to}
                className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 rounded-xl font-semibold shadow ${
                        style.css
                    } ${isActive ? style.active : `border border-base-content/20`}`
                }
            >
                <span className="text-base ">
                    {style.icon}
                </span>
                 { style.name}{task > 0 ? `(${task})` : ''}
                {''}
            </NavLink>
  )
}

export default TaskTab
