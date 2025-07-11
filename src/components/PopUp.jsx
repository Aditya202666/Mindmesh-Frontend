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
        <div className="border-2  border-base-content p-4 bg-base-100 rounded-lg ">
        <h1 className="font-semibold text-xl tracking-tighter mb-2 text-orange-600">Warning!</h1>
          <p>{popUpMessage}</p>
          {/* buttons */}
          <div className="ml-auto w-fit flex space-x-2 mr-4 mt-6 ">
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
