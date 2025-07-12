import React, { useState } from "react";
import { createTask } from "../api/apiCalls/personalTaskApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { increaseRefreshToken } from "../store/features/filterSlice";

const today = new Date().toISOString().split("T")[0];

const CreatePersonalTaskButton = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [titleLength, setTitleLength] = useState(0);
    const [descLength, setDescLength] = useState(0);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.querySelector('input[type="text"]').value;
        const description = form.querySelector("textarea").value;
        const status = form.querySelector("select").value;
        const priority = form.querySelectorAll("select")[1].value;
        const color = form.querySelectorAll("select")[2].value;
        const inputDate = form.querySelector('input[type="date"]').value;
        const dueDate = new Date(inputDate)
        // console.log(dueDate)
        if (dueDate === "") {
            toast.error("Please select a date");
            console.log('inside')
            return
        }

        const res = await createTask({
            title,
            description,
            status,
            priority,
            color,
            dueDate,
        });
        if (res && res.success) {
            dispatch(increaseRefreshToken());
            // console.log(res.data)
        }

        // Reset the form and close the modal
        form.reset();
        setOpen(false);
        setDescLength(0);
        setTitleLength(0);
    };

    const handelCancel = () => {
        setOpen(false);
        setDescLength(0);
        setTitleLength(0);
    };

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn btn-sm bg-sky-300 hover:bg-sky-400 rounded-lg shadow border-base-content/50 text-black"
            >
                New Task
            </button>
            <dialog className={`fixed flex items-center justify-center w-screen h-screen top-0 z-10 bg-base-content/20 `  + (open ? "block": `hidden`)}
            >
                <form
                    onSubmit={handleCreateTask}
                    className="lg:translate-x-[8rem] flex flex-col bg-base-300 border-2 border-base-content shadow-lg gap-4 p-4 rounded-lg "
                >
                    <h1 className=" font-medium text-xl">Create New Task</h1>
                    <label className="floating-label">
                        <span className="bg-neutral ">Title</span>
                        <input
                            type="text"
                            placeholder="Title"
                            maxLength={50}
                            required
                            className="input font-semibold text-sm  w-full rounded-lg"
                            onChange={(e) =>
                                setTitleLength(e.target.value.length)
                            }
                        />
                        <p className="absolute text-xs right-2 bottom-0 z-10">
                            {titleLength}/50
                        </p>
                    </label>
                    <label className="floating-label">
                        <span>Description</span>
                        <textarea
                            placeholder="Description"
                            maxLength={500}
                            required
                            rows={6}
                            className="textarea text-xs font-medium resize-none w-full rounded-lg"
                            onChange={(e) =>
                                setDescLength(e.target.value.length)
                            }
                        ></textarea>
                        <p className="absolute text-xs right-2 bottom-0 z-10">
                            {descLength}/500
                        </p>
                    </label>

                    <div className="flex gap-2">
                        <div>
                            <label className="select select-sm cursor-pointer rounded-lg ">
                                <span className="label">Status</span>
                                <select className=" w-full max-w-xs rounded-lg">
                                    <option>To-do</option>
                                    <option>In-Progress</option>
                                    <option>Completed</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label className="select select-sm cursor-pointer rounded-lg">
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
                        <div>
                            <label className="select select-sm cursor-pointer rounded-lg">
                                <span className="label  cursor-pointer">
                                    Color
                                </span>
                                <select className="w-full max-w-xs rounded-lg">
                                    <option>Grey</option>
                                    <option>Blue</option>
                                    <option>Yellow</option>
                                    <option>Rose</option>
                                    <option>Coral</option>
                                    <option>Emerald</option>
                                    <option>Lavender</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <span className="input input-sm w-fit rounded-lg">
                            <span className="label">Due date</span>
                    <input
                        type="date"
                        min={today}
                        // className=" rounded-lg  "
                        />
                        </span>
                    <div className="flex items-center gap-2 ml-auto ">
                        <button
                            type="reset"
                            onClick={handelCancel}
                            className="btn bg-red-400 hover:bg-red-500 text-black border-base-content/50 btn-sm rounded-lg "
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-green-400 hover:bg-green-500 text-black btn-sm border-base-content/50 rounded-lg "
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default CreatePersonalTaskButton;
