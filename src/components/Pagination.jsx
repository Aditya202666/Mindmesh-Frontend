import React from "react";

const Pagination = ({ pageNumber, setPageNumber, totalPages }) => {


  const increasePageNumber = () => {
    setPageNumber(prev => {
        if(prev < totalPages){
            return prev + 1
        }else{
            return prev
        }
    })
  };
  const decreasePageNumber = () => {
    setPageNumber(prev => {
        if(prev > 1){
            return prev - 1
        }else{
            return prev
        }
    })
  };

  // console.log("data" , pageNumber, totalPages)
  return (
    <div className="flex items-center  gap-4 ">
      <button
        className={`${
          pageNumber === 1 && "hidden"
        }  btn btn-sm btn-wide rounded-lg text-black mr-auto  border-base-content/50 bg-gray-300 hover:bg-gray-400`}
        onClick={decreasePageNumber}
      >
        Previous Page
      </button>
      <button
        className={`${
          pageNumber === totalPages && "hidden"
        }  btn btn-sm btn-wide rounded-lg text-black ml-auto  border-base-content/50 bg-gray-300 hover:bg-gray-400`}
        onClick={increasePageNumber}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
