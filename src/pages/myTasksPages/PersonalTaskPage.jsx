import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addPersonalTaskChecklist,
  getOneTask,
  markAsCompletedPersonalTask,
  markAsCompletedPersonalTaskChecklist,
} from "../../api/apiCalls/personalTaskApi";
import { useSelector } from "react-redux";
import { HiCalendarDateRange } from "react-icons/hi2";
import { getFormattedDate } from "../../api/utils/getDate";
import { FaCheckCircle, FaEdit, FaPlus } from "react-icons/fa";

// todo: add edit functionality in this task page

const PersonalTaskPage = () => {
  const params = useParams();
  const { bgColors, priorityBadges, statusBadges } = useSelector(
    (state) => state.theme
  );

  const [task, setTask] = useState(null);
  const [openAddChecklistInput, setOpenAddChecklistInput] = useState(false);
  const [checklistInput, setChecklistInput] = useState("");

  const handelAddNewChecklist = async () => {
    const res = await addPersonalTaskChecklist({
      id: task._id,
      title: checklistInput,
    });
    if (res && res.success) {
      console.log(res.data);
      setTask(res.data);
      setOpenAddChecklistInput(false);
      setChecklistInput("");
    }
  };

  const handelMarkChecklistAsCompleted = async (checklistId) => {
    const res = await markAsCompletedPersonalTaskChecklist(
      task._id,
      checklistId
    );
    if (res && res.success) {
      setTask(res.data);
    }
  };

  const handleMarkAsCompletePersonalTask = async () => {
    const res = await markAsCompletedPersonalTask(task._id);
    if (res && res.success) {
      setTask(res.data);
    }
  };

  const handelCancelChecklist = () => {
    setOpenAddChecklistInput(false);
    setChecklistInput("");
  };

  useEffect(() => {
    const fetchTask = async () => {
      const res = await getOneTask(params.taskId);

      if (res && res.success) {
        setTask(res.data);
        console.log(res.data);
      }
    };
    fetchTask();
  }, [params.taskId]);

  return (
    <div className={`w-full my-6`}>
      {/* task container */}
      <div className={`w-[45rem] border p-2  rounded-lg  bg-base-200`}>
        {/* header */}
        <div className="flex items-center space-x-2 text-sm ">
          {/* badges */}
          <div>
            <span className=" text-xs">Status:</span>
            <span
              className={
                "badge badge-sm text-black ml-1 border border-black font-semibold " +
                statusBadges[task?.status]
              }
            >
              {` ` + task?.status}
            </span>
          </div>
          <div>
            <span className=" text-xs">Priority:</span>
            <span
              className={
                "badge badge-sm ml-1 text-black border border-black font-semibold " +
                priorityBadges[task?.priority]
              }
            >
              {` ` + task?.priority}
            </span>
          </div>
          {/* right side header */}
          <div className="flex items-center w-fit ml-auto space-x-2">
            <div className="flex items-center text-sm ml-auto font-semibold w-fit">
              <HiCalendarDateRange className="mr-1 " />
              {task?.dueDate ? `${getFormattedDate(task.dueDate)}` : "NA"}
            </div>
            <div
              className="shadow border border-base-content/50 cursor-pointer  hover:shadow-base-content px-2 py-1 rounded-lg "
              title="Edit Task"
            >
              <FaEdit />
            </div>
          </div>
        </div>

        <div className="p-2">
          {/* title & desc  */}
          <div className="space-y-2">
            <div className="text-2xl font-semibold mt-2">{task?.title}</div>

            {/* desc */}
            <div className="text-sm tracking-tight leading-snug ">
              {task?.description}
            </div>
          </div>

          {/* checklist */}
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-semibold">Checklist:</h3>
            <div className="ml-2 space-y-0.5">
              {task?.subTasks.length > 0 &&
                task.subTasks.map((subTask) => (
                  <div
                    key={subTask._id}
                    className="flex items-center justify-between border border-base-content/50 rounded-lg w-4/5 pl-2  pt-1 pb-0.5"
                  >
                    <span>{subTask.title}</span>
                    <span className="mr-10 border-2 rounded-full">
                      {subTask.isCompleted ? (
                        <FaCheckCircle className="text-base-100 bg-base-content rounded-full transition-all" />
                      ) : (
                        <FaCheckCircle
                          title="Mark as Complete"
                          className="cursor-pointer text-base-100 bg-base-content/10 active:text-green-400 hover:bg-base-content rounded-full transition-all"
                          onClick={() =>
                            handelMarkChecklistAsCompleted(subTask._id)
                          }
                        />
                      )}
                    </span>
                  </div>
                ))}

              {/* Add checklist button */}
              {!openAddChecklistInput && (
                <div
                  title="Add checklist"
                  onClick={() => setOpenAddChecklistInput(true)}
                  className="btn bg-transparent flex items-center justify-center border border-base-content/50 rounded-lg w-4/5 max-h-8 mb-0.5"
                >
                  <FaPlus className="h-6 text-base-content/50" />
                </div>
              )}

              {/* checklist input */}
              {openAddChecklistInput && (
                <div className="relative flex space-x-2">
                  <input
                    title="Checklist input"
                    className="relative bg-transparent flex items-center justify-center border text-[1rem] border-black/50 rounded-lg w-4/5 pl-2 py-1   input-lg"
                    type="text"
                    maxLength={50}
                    placeholder="Checklist..."
                    value={checklistInput}
                    onChange={(e) => setChecklistInput(e.target.value)}
                  />
                  <p className="absolute text-xs right-35 bottom-0 z-10">
                    {checklistInput.length}/50
                  </p>
                  {checklistInput.length > 0 && (
                    <button
                      type="button"
                      onClick={handelAddNewChecklist}
                      className="btn btn-sm bg-gray-800 text-white rounded-lg border border-base-content/50"
                    >
                      Add
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handelCancelChecklist}
                    className="btn btn-sm bg-red-800 text-white rounded-lg border border-base-content/50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="w-fit ml-auto">
          <button
            type="button"
            onClick={handleMarkAsCompletePersonalTask}
            className="btn bg-green-400 text-black btn-sm rounded-lg mt-4 border border-base-content/50"
          >
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalTaskPage;
