import { Link } from "react-router-dom";
import Task from "./Task";


const TaskOrganizer = ({ taskList, title, link, bgColor }) => {


    console.log(taskList, title, link)

  if (!taskList.length > 0) return null;

  return (
    <div className={`group w-full border rounded-t-3xl rounded-b-xl border-base-content/50 bg-base-200`}>
      {/* header */}
      <div>
        <h1 className={` flex text-black items-baseline justify-between py-1 pl-4 rounded-t-3xl font-semibold border-b border-base-content/50  ${bgColor}`}>
          {title}
          <Link to={link} className="mr-4 text-xs underline ">
            {" "}
            View All
          </Link>
        </h1>
      </div>
      <div className="flex gap-2 m-2 overflow-scroll scrollbar-hide">
        {taskList && taskList.length > 0
          ? taskList.map((task) => <Task task={task} key={task._id} />)
          : null}
      </div>
    </div>
  );
};

export default TaskOrganizer;

// todo: add open close button
