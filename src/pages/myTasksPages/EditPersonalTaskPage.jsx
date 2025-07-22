import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOneTask,
  markAsCompletedPersonalTask,
  markAsCompletedPersonalTaskChecklist,
  updatePersonalTask,
} from "../../api/apiCalls/personalTaskApi";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import PopUp from "../../components/PopUp";


const EditPersonalTaskPage = () => {
  const params = useParams();
  const navigate = useNavigate()

  const [task, setTask] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const dueDate  = task?.dueDate ? task.dueDate.split("T")[0] : ""

  const handelRemoveChecklist = (id) => {
    setTask((prev) => {
      const updatedSubTasks = prev.subTasks.filter((item) => item._id !== id);

      return {
        ...prev,
        subTasks: updatedSubTasks,
      };
    });
  };

  const handleUpdateTask = async()=>{

    const res = await updatePersonalTask(task._id, {...task, dueDate: new Date(task.dueDate)})
    if(res && res.success){
        console.log(task._id, {...task, dueDate: new Date(task.dueDate)})
        navigate(`/my-tasks/${task._id}`)
    }

  }


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
      <div className={`w-[46rem] border p-2 rounded-lg  bg-base-200`}>
        {/* header */}
        <div className="flex items-center space-x-2 text-sm w-full">
          {/* badges */}
          <label className="select select-sm cursor-pointer rounded-lg w-fit ">
            <span className="label">Status</span>
            <select
              value={task?.status}
              onChange={(e) => {
                setTask((prev) => ({ ...prev, status: e.target.value }));
              }}
              className=" w-full max-w-xs rounded-lg"
            >
              <option>To-do</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>
          </label>
          <label className="select select-sm cursor-pointer rounded-lg w-fit ">
            <span className="label">Priority</span>
            <select
              value={task?.priority}
              onChange={(e) => {
                setTask((prev) => ({ ...prev, priority: e.target.value }));
              }}
              className=" w-full max-w-xs rounded-lg"
            >
              <option>None</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
          <label className="select select-sm cursor-pointer rounded-lg w-fit ">
            <span className="label">Color</span>
            <select
              value={task?.color}
              onChange={(e) => {
                setTask((prev) => ({ ...prev, color: e.target.value }));
              }}
              className="w-fit rounded-lg"
            >
              <option>Yellow</option>
              <option>Emerald</option>
              <option>Lavender</option>
              <option>Rose</option>
              <option>Blue</option>
              <option>Grey</option>
              <option>Coral</option>
            </select>
          </label>
          {/* right side header */}
          <span className="input input-sm w-fit rounded-lg">
            <span className="label">Due date</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setTask((prev) => ({ ...prev, dueDate: e.target.value }));
              }}
              min={today}
            />
          </span>
        </div>

        <div className="p-2 mt-4">
          {/* title & desc  */}
          <div className="space-y-4">
            {/* <div className="text-2xl font-semibold mt-2">{task?.title}</div> */}
            <label className="floating-label">
              <span className="bg-neutral ">Title</span>
              <input
                type="text"
                value={task?.title || ""}
                placeholder="Title"
                maxLength={50}
                required
                className="input font-semibold text-sm  w-full rounded-lg"
                onChange={(e) => {
                  setTask((prev) => ({ ...prev, title: e.target.value }));
                }}
              />
              <p className="absolute text-xs right-2 bottom-0 z-10">
                {task?.title.length}/50
              </p>
            </label>

            {/* desc */}
            <label className="floating-label">
              <span>Description</span>
              <textarea
                placeholder="Description"
                maxLength={500}
                required
                rows={6}
                value={task?.description || ""}
                className="textarea text-xs font-medium resize-none w-full rounded-lg"
                onChange={(e) => {
                  setTask((prev) => ({ ...prev, description: e.target.value }));
                }}
              ></textarea>
              <p className="absolute text-xs right-2 bottom-0 z-10">
                {task?.description.length}/500
              </p>
            </label>
          </div>

          {/* checklist */}
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-semibold">Checklist:</h3>
            <div className="ml-2 space-y-0.5">
              {task?.subTasks.length > 0 &&
                task.subTasks.map((subTask) => (
                  <div
                    key={subTask._id}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center justify-between border border-base-content/50 rounded-lg w-4/5 pl-2  pt-1 pb-0.5">
                      <span>{subTask.title}</span>
                      <span className="mr-10 border-2 rounded-full">
                        {subTask.isCompleted ? (
                          <FaCheckCircle className="text-base-100 bg-base-content rounded-full transition-all" />
                        ) : (
                          <FaCheckCircle
                            title="Mark as Complete"
                            className="cursor-pointer text-base-100 bg-base-content/10  rounded-full transition-all"
                          />
                        )}
                      </span>
                    </div>
                    <MdDeleteForever
                      className="hover:text-red-700 hover:scale-115 transition-all"
                      onClick={() => handelRemoveChecklist(subTask._id)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex items-center mt-4 space-x-2 w-fit ml-auto">
          <PopUp
            buttonCss={"btn-sm bg-red-400 hover:bg-red-500"}
            buttonName={"Cancel"}
            callbackFunction={()=>navigate(`/my-tasks/${task._id}`)}
            callbackButtonName = {"Leave"}
            callbackButtonCss={"bg-red-400 hover:bg-red-500"}
            popUpMessage={`Are you sure you want to leave this page? All unsaved data will be lost.`}
          />
          <button
            type="button"
            onClick={handleUpdateTask}
            className="btn bg-amber-300 hover:bg-amber-400 text-black btn-sm rounded-lg border border-base-content/50"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPersonalTaskPage;
