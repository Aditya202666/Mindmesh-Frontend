import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { addProject } from "../store/features/personalTaskSlice";
import { createProject } from "../api/apiCalls/personalTaskApi";


const CreateProjectButton = ({ heading, maxNameLength }) => {


  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleCreateProject = async (e) => {
    e.preventDefault();

    // todo:
    
    const res = await createProject(name);

    if (res && res.success) {
      console.log(res);
      dispatch(addProject(res.data));

    }

    setOpen(false);
    setName("");

  };

  const handelCancel = () => {
    setOpen(false);
    setName("");
  };

  return (
    <div>
      <FaPlus
        className="absolute bg-amber-300 p-1 size-4 rounded-xl text-black top-2.5 right-0 cursor-pointer hover:bg-amber-400 active:scale-90"
        onClick={() => setOpen(true)}
      />

      <dialog
        className={
          `fixed flex items-center justify-center w-screen h-screen top-0 z-10 bg-black/50 ` +
          (open ? "block" : `hidden`)
        }
      >
        <form
          onSubmit={handleCreateProject}
          className="lg:translate-x-[8rem] w-2xl flex flex-col bg-base-300 border-2 border-base-content shadow-lg gap-4 p-4 rounded-lg "
        >
          <h1 className=" font-medium text-xl">{heading}</h1>
          <label className="floating-label">
            <span className="bg-neutral ">Name</span>
            <input
              type="text"
              placeholder="Project name"
              maxLength={maxNameLength}
              required
              className="input font-semibold text-sm  w-full rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="absolute text-xs right-2 bottom-0 z-10">
              {name?.length}/{maxNameLength}
            </p>
          </label>
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
              Create
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CreateProjectButton;
