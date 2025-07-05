import React from "react";
import { useSelector } from "react-redux";
import Task from "../../components/Task";
import { useLocation } from "react-router-dom";

const AllTasksPage = () => {

  const { allTasks } = useSelector((state) => state.personalTask);
    const location = useLocation()
  const params = new URLSearchParams(location.search)
    
  const status = params.get('status')
  console.log("params", status)
  console.log("location", location)

  console.log(allTasks)
  return <div>
    {allTasks && allTasks.length > 0 ? 
    allTasks.map(taskItem =>(
        <Task task={taskItem} />
    ))
    : ""    
}
  </div>;
};

export default AllTasksPage;
