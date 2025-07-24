import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeProjectName, deleteProject } from "../api/apiCalls/personalTaskApi";
import { MdCancel, MdEdit } from "react-icons/md";
import { changeProjectNameInStore, removeProject } from "../store/features/personalTaskSlice";
import { useLocation, useNavigate } from "react-router-dom";

const EditProjectButton = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(project.name);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname.split("/").pop()

  const handleCreateProject = async (e) => {
    e.preventDefault();

    // todo:

    const res = await changeProjectName(name, project._id);

    if (res && res.success) {
      // console.log(res);
      dispatch(changeProjectNameInStore(res.data));
    
      
    }
    
    setOpen(false);
};
const handleDeleteProject = async (e) => {
    e.preventDefault();
    
    // todo:
    
    const res = await deleteProject(project._id);
    
    if (res && res.success) {
        // console.log(res);
        dispatch(removeProject(project._id));
        if(pathname === project._id) navigate("/my-tasks/overview");
      
    }

    setOpen(false);
    setName("");
  };

  const handelCancel = () => {
    setOpen(false);
    setName(project.name);
  };

  return (
    <div>
      <div className="w-3" onClick={() => setOpen(true)}>
        <MdEdit className="text-sm group-hover:block hidden hover:scale-115 transition-all " />
      </div>

      <dialog
        className={
          `fixed flex items-center justify-center w-screen h-screen top-0 z-10 bg-black/50 ` +
          (open ? "block" : `hidden`)
        }
      >
        <form
          onSubmit={handleCreateProject}
          className="lg:translate-x-[8rem] relative w-2xl flex flex-col bg-base-300 border-2 border-base-content shadow-lg gap-4 p-4 rounded-lg "
        >
          <button
            type="button"
            onClick={handelCancel}
            className="absolute top-2 right-2   text-red-500  "
            title="Cancel"
          >
            <MdCancel className="text-lg cursor-pointer hover:scale-110 transition-all" />
          </button>

          <h1 className=" font-medium text-xl">Edit Project</h1>
          <label className="floating-label">
            <span className="bg-neutral ">Name</span>
            <input
              type="text"
              placeholder="Project name"
              maxLength={50}
              required
              className="input font-semibold text-sm  w-full rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="absolute text-xs right-2 bottom-0 z-10">
              {name?.length}/{50}
            </p>
          </label>
          <div className="flex items-center gap-2 ml-auto ">
            <button
              type="button"
              onClick={handleDeleteProject}
              className="btn bg-red-400 hover:bg-red-500 text-black btn-sm border-base-content/50 rounded-lg "
            >
              Delete
            </button>
            <button
              type="submit"
              className="btn bg-green-400 hover:bg-green-500 text-black btn-sm border-base-content/50 rounded-lg "
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default EditProjectButton;
