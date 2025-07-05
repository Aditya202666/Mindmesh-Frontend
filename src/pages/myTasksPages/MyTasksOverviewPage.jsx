import React from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import TaskOrganizer from "../../components/TaskOrganizer";

const MyTasksOverviewPage = () => {
    const { overdueLastMonth, dueInSevenDays, recentTask } = useSelector(
        (state) => state.personalTask
    );
    const navigate = useNavigate();

    console.log(recentTask);
    return (
        <div className="mt-6 space-y-6" >
            <TaskOrganizer taskList={overdueLastMonth} title={"Overdue last month"} link={"overdue-tasks"} bgColor={'bg-error'} textColor={'text-error-content'}/>
            <TaskOrganizer taskList={dueInSevenDays} title={"Due in 7 Days"} link={"pending-tasks"} bgColor={'bg-warning'} textColor={'text-warning-content'}/>
            <TaskOrganizer taskList={recentTask} title={"Recent"} link={"all-tasks"} bgColor={'bg-info'} textColor={'text-secondary-content'}/>
        </div>
    );
};

export default MyTasksOverviewPage;
