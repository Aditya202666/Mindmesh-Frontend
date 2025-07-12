import { Link } from "react-router-dom";
import Task from "./Task";
import { useState } from "react";
import { GoTriangleRight } from "react-icons/go";

const TaskOrganizer = ({ taskList, title, link, bgColor }) => {
  const [open, setOpen] = useState(true);
  // console.log(open)
  if (!taskList.length > 0) return null;

  return (
    <div
      className={`w-full`}
    >
      {/* header */}
      <div
        className={` flex text-black items-baseline justify-between py-1 pl-4 rounded-t-3xl font-semibold border border-base-content  ${bgColor} transition-all duration-300`}
      >
        <div className="flex items-center">

          <span
            className={`cursor-pointer ml-1 inline-block transition-transform duration-200 ${
              !open ?  "" :"rotate-90 origin-center" 
            }`}
            onClick={()=>setOpen(prev =>!prev)}
            >
              <GoTriangleRight />

          </span>
        <h1>
          {title}
          </h1>
            </div>
        <Link to={link} className="mr-4 text-xs underline ">
          {" "}
          View All
        </Link>
      </div>
      <div className={` ${open ? "flex" : "hidden"} border border-t-0 rounded-b-3xl transition-all duration-300 gap-2 p-2 overflow-scroll scrollbar-hide`}>
        {taskList && taskList.length > 0
          ? taskList.map((task) => <Task task={task} key={task._id} />)
          : null}
      </div>
      <div className={`bg-base-300 border border-t-0 rounded-b-3xl h-8 ${open ? "hidden" : "block"}` }></div>
    </div>
  );
};

export default TaskOrganizer;

