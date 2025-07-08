import React, { useState } from "react";



const PopUp = ({ buttonName, buttonCss, popUpMessage, callbackFunction, callbackButtonName, callbackButtonCss  }) => {
  const [open, setOpen] = useState(false);


  const handelClick =async()=>{

    callbackFunction()
    setOpen(false)

  }

  return (
    <div className="">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`btn rounded-lg shadow border-base-content/50 text-black ${buttonCss}`}
      >
        {buttonName}
      </button>
      <dialog
        className={
          `fixed flex items-center justify-center w-screen h-screen top-0 z-10 bg-base-content/20 ` +
          (open ? "block" : `hidden`)
        }
      >
        <div className="border border-base-content/50 p-4 bg-base-100 rounded-lg space-y-6 ">
          <p>{popUpMessage}</p>
          <div className="ml-auto w-fit flex space-x-2 mr-4 ">
            <button
              type="button"
              className="btn btn-sm text-black bg-gray-400 hover:bg-gray-500 border rounded-lg border-base-content/50"
              onClick={()=>setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-sm text-black  border rounded-lg border-base-content/50 ${callbackButtonCss}`}
              onClick={handelClick}
            >
              {callbackButtonName}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PopUp;
