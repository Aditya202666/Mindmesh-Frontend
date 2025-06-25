import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createTask } from "../api/apiCalls/personalTaskApi";
import { useDispatch } from "react-redux";
import { addTask } from "../store/features/personalTaskSlice";

const today = new Date().toISOString().split("T")[0];

const CreatePersonalTaskButton = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.querySelector('input[type="text"]').value;
        const description = form.querySelector("textarea").value;
        const status = form.querySelector("select").value;
        const priority = form.querySelectorAll("select")[1].value;
        const inputDate = form.querySelector('input[type="date"]').value;
        const dueDate = new Date(inputDate).toISOString();

        const res = await createTask({
            title,
            description,
            status,
            priority,
            dueDate,
        });
        if (res && res.success) {
            dispatch(addTask(res.data));
        }

        // Reset the form and close the modal
        form.reset();
        setOpen(false);
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn btn-primary btn-sm rounded-lg shadow "
            >
                New Task
            </button>
            <div
                className={
                    `absolute left-[35%] top-[20%] w-xl rounded-lg bg-base-300 border-2 shadow-lg ` +
                    (open ? "block" : "hidden")
                }
            >
                <form
                    onSubmit={handleCreateTask}
                    className="flex flex-col gap-4 p-4 rounded-lg "
                >
                    <label className="floating-label">
                        <span className="bg-neutral ">Title</span>
                        <input
                            type="text"
                            placeholder="Title"
                            maxLength={50}
                            required
                            className="input font-semibold text-lg  w-full rounded-lg"
                        />
                    </label>
                    <label className="floating-label">
                        <span>Description</span>
                        <textarea
                            placeholder="Description"
                            maxLength={200}
                            required
                            rows={4}
                            className="textarea  resize-none w-full rounded-lg"
                        ></textarea>
                    </label>

                    <div className="flex gap-2">
                        <div>
                            <label className="select cursor-pointer rounded-lg ">
                                <span className="label">Status</span>
                                <select className=" w-full max-w-xs rounded-lg">
                                    <option>To-do</option>
                                    <option>In-Progress</option>
                                    <option>Completed</option>
                                    <option>Overdue</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="select cursor-pointer rounded-lg">
                                <span className="label  cursor-pointer">
                                    Priority
                                </span>
                                <select className="w-full max-w-xs rounded-lg">
                                    <option>None</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <input type="date" min={today} className="input rounded-lg  w-fit" />
                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="btn btn-error border-error-content btn-sm rounded-lg "
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success btn-sm border-success-content rounded-lg "
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePersonalTaskButton;
