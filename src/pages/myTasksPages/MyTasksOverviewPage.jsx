import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskOrganizer from "../../components/TaskOrganizer";
import { getTaskOverview } from "../../api/apiCalls/personalTaskApi";
import { addDetails, addDueInSevenDays, addInProgressTasks, addOverdueLastMonth, addRecentTask } from "../../store/features/personalTaskSlice";

const MyTasksOverviewPage = () => {

    const dispatch = useDispatch()

  const { overdueLastMonth, dueInSevenDays, recentTask } = useSelector(
    (state) => state.personalTask
  );
  const navigate = useNavigate();

  useEffect(() => {
    const callGetTaskOverview = async () => {
      const res = await getTaskOverview();
      if (res && res.success) {
        useDispatch(addDueInSevenDays(res.data.dueInSevenDays));
        dispatch(addOverdueLastMonth(res.data.overdueLastMonth));
        dispatch(addInProgressTasks(res.data.inProgressTasks));
        dispatch(addRecentTask(res.data.recentTask));
        dispatch(addDetails(res.data.taskDetails));
      }
    };
    callGetTaskOverview();
  }, [dispatch]);

//   console.log(recentTask);
  return (
    <div className="mt-6 space-y-6">
      <TaskOrganizer
        taskList={overdueLastMonth}
        title={"Overdue"}
        link={"overdue-tasks"}
        bgColor={"bg-error"}
        textColor={"text-error-content"}
      />
      <TaskOrganizer
        taskList={dueInSevenDays}
        title={"Due in 7 Days"}
        link={"pending-tasks"}
        bgColor={"bg-warning"}
        textColor={"text-warning-content"}
      />
      <TaskOrganizer
        taskList={recentTask}
        title={"Recent"}
        link={"all-tasks"}
        bgColor={"bg-info"}
        textColor={"text-secondary-content"}
      />
    </div>
  );
};

export default MyTasksOverviewPage;
