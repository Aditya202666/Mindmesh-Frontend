import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskOrganizer from "../../components/TaskOrganizer";
import { getTaskOverview } from "../../api/apiCalls/personalTaskApi";
import {
  addDetails,
  addDueInSevenDays,
  addInProgressTasks,
  addOverdueLastMonth,
  addRecentTask,
} from "../../store/features/personalTaskSlice";

const MyTasksOverviewPage = () => {
  
  const dispatch = useDispatch();
  const { overdueLastMonth, inProgressTasks, dueInSevenDays, recentTask } = useSelector(
    (state) => state.personalTask
  );
  const { refreshToken } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    const callGetTaskOverview = async () => {
      const res = await getTaskOverview();
      if (res && res.success) {
        // console.log(res.data);
        dispatch(addDueInSevenDays(res.data.dueInSevenDays));
        dispatch(addOverdueLastMonth(res.data.overdueLastMonth));
        dispatch(addInProgressTasks(res.data.inProgressTasks));
        dispatch(addRecentTask(res.data.recentTask));
      }
    };
    callGetTaskOverview();
  }, [dispatch, refreshToken]);

  //   console.log(recentTask);
  return (
    <div className="mt-6 space-y-6">
      <TaskOrganizer
        taskList={overdueLastMonth}
        title={"Overdue"}
        link={"/my-tasks/overdue-tasks"}
        bgColor={"bg-red-500"}
      />
      <TaskOrganizer
        taskList={dueInSevenDays}
        title={"Due in 7 Days"}
        link={"/my-tasks/pending-tasks"}
        bgColor={"bg-orange-500"}
      />
      <TaskOrganizer
        taskList={inProgressTasks}
        title={"In-progress"}
        link={"/my-tasks/in-progress-tasks"}
        bgColor={"bg-lime-500"}
      />
      <TaskOrganizer
        taskList={recentTask}
        title={"Recent"}
        link={"/my-tasks/all-tasks"}
        bgColor={"bg-sky-500"}
      />
    </div>
  );
};

export default MyTasksOverviewPage;
