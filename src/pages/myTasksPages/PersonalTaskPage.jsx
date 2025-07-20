import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPersonalTaskChecklist,
  changePersonalTaskStatusToInProgress,
  deletePersonalTask,
  getOneTask,
  markAsCompletedPersonalTask,
  markAsCompletedPersonalTaskChecklist,
} from "../../api/apiCalls/personalTaskApi";
import { useSelector } from "react-redux";
import { HiCalendarDateRange } from "react-icons/hi2";
import { getFormattedDate } from "../../api/utils/getDate";
import { FaCheckCircle, FaEdit, FaPlus } from "react-icons/fa";
import PopUp from "../../components/PopUp";
import { MdDeleteForever } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbPick } from "react-icons/tb";

const PersonalTaskPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { priorityBadges, statusBadges } = useSelector((state) => state.theme);

  const [task, setTask] = useState(null);
  const [openAddChecklistInput, setOpenAddChecklistInput] = useState(false);
  const [checklistInput, setChecklistInput] = useState("");

  const handleAddNewChecklist = async (e) => {
    e.preventDefault();
    const res = await addPersonalTaskChecklist(task._id, checklistInput);
    if (res && res.success) {
      // console.log(res.data);
      setTask(res.data);
      setOpenAddChecklistInput(false);
      setChecklistInput("");
    }
  };

  const handleMarkChecklistAsCompleted = async (checklistId) => {
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

  const handleDeletePersonalTask = async () => {
    const res = await deletePersonalTask(task._id);
    if (res && res.success) {
      navigate("/my-tasks/overview");
    }
  };

  const handlePickUpTask = async () => {
    const res = await changePersonalTaskStatusToInProgress(task._id);
    if (res && res.success) {
      setTask(res.data);
    }
  };

  const handleCancelChecklist = () => {
    setOpenAddChecklistInput(false);
    setChecklistInput("");
  };

  useEffect(() => {
    const fetchTask = async () => {
      const res = await getOneTask(params.taskId);

      if (res && res.success) {
        setTask(res.data);
        // console.log(res.data);
      }
    };
    fetchTask();
  }, [params.taskId]);

  return (
    <div className={`w-full my-6`}>
      {/* task container */}
      <div className={`w-[46rem] border p-2  rounded-lg  bg-base-200`}>
        {/* header */}
        <div className="relative flex items-center space-x-2 text-sm ">
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
          {/* date */}
          <div className="flex items-center w-fit ml-auto mr-8 space-x-2">
            <div className="flex items-center text-sm ml-auto font-semibold w-fit">
              <HiCalendarDateRange className="mr-1 " />
              {task?.dueDate ? `${getFormattedDate(task.dueDate)}` : "NA"}
            </div>
          </div>
          {/* dropdown */}
          <div
            className="dropdown dropdown-end absolute right-0 top-0 "
            tabIndex={0}
            role="button"
          >
            <div className={" bg-transparent m-1 p-0 border-0 "}>
              <BsThreeDotsVertical
                className={`text-lg hover:scale-110 text-black transition-all `}
              />
            </div>
            <ul className="menu text-base-content dropdown-content bg-base-100 p-1 border border-base-content/50 rounded-md z-1 w-40 text-xs font-medium p ">
              {task?.isCompleted === false && (
                <li>
                  <div
                    className="  cursor-pointer rounded-lg "
                    title="Edit Task"
                    onClick={() =>
                      navigate(`/my-tasks/overview/${task?._id}/edit`)
                    }
                  >
                    <FaEdit />
                    Edit
                  </div>
                </li>
              )}
              { task?.status === "To-do" && (
                <li onClick={handlePickUpTask}>
                  <div>
                    <TbPick /> PickUp Task
                  </div>
                </li>
              )}
              <li
                className="text-red-500 rounded-md"
                onClick={handleDeletePersonalTask}
              >
                <a>
                  {" "}
                  <MdDeleteForever /> Delete
                </a>
              </li>
            </ul>
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
                            handleMarkChecklistAsCompleted(subTask._id)
                          }
                        />
                      )}
                    </span>
                  </div>
                ))}

              {/* Add checklist button */}
              {!openAddChecklistInput && task?.isCompleted === false && (
                <div
                  title="Add checklist"
                  onClick={() => setOpenAddChecklistInput(true)}
                  className="group btn bg-transparent  flex items-center justify-center border border-base-content/50 rounded-lg w-4/5 max-h-8 mb-0.5"
                >
                  <FaPlus className="h-6 text-base-content/50 group-hover:scale-115 transition-all group-hover:text-base-content" />
                </div>
              )}

              {/* checklist input */}
              {openAddChecklistInput && (
                <form
                  onSubmit={handleAddNewChecklist}
                  className="relative flex space-x-2"
                >
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
                      type="submit"
                      className="btn btn-sm bg-sky-300 hover:bg-sky-400 text-black rounded-lg border border-base-content/50"
                    >
                      Add
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleCancelChecklist}
                    className="btn btn-sm bg-red-400 hover:bg-red-500 text-black rounded-lg border border-base-content/50"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex mt-4 space-x-2 w-fit ml-auto">
          {task?.isCompleted === false && (
            <PopUp
              buttonCss={"bg-green-400 hover:bg-green-500 btn-sm"}
              buttonName={"Mark as Completed"}
              callbackButtonCss={"bg-green-400 hover:bg-green-500 "}
              callbackButtonName={"Confirm"}
              callbackFunction={handleMarkAsCompletePersonalTask}
              popUpMessage={
                "After marking this task as completed, you will no longer be able to make changes to it."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalTaskPage;
