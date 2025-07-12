import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Task";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiCalendarDateRange } from "react-icons/hi2";
import { getAllTasks } from "../../api/apiCalls/personalTaskApi";
import { addAllTasks } from "../../store/features/personalTaskSlice";
import Pagination from "../../components/Pagination";

// todo complete all task page

const AllTasksPage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { allTasks } = useSelector((state) => state.personalTask);
  const { fromDate, refreshToken } = useSelector((state) => state.filter);

  const [dateInput, setDateInput] = useState(fromDate);
  const [searchInput, setSearchInput] = useState("");

  const [showingFrom, setShowingFrom] = useState(null);
  const [showingTo, setShowingTo] = useState(null);
  const [totalResult, setTotalResult] = useState(null);

  const [pageNumber, setPageNumber] = useState(1)

  const totalPages = Math.ceil( totalResult / 20);
  // console.log(pageNumber);

  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      ``;
    }
  };

  useEffect(() => {
    const handleGetAllTasks = async () => {
      console.log("here");
      const res = await getAllTasks({ fromDate: dateInput, page:pageNumber, status:"All" });
      if (res && res.success) {
        dispatch(addAllTasks(res.data));
        setShowingFrom(res.data.taskDetails[0].showingFrom);
        setShowingTo(res.data.taskDetails[0].showingTo);
        setTotalResult(res.data.taskDetails[0].totalTasks);
        // console.log(res.data);
      }
    };
    handleGetAllTasks();
  }, [dispatch, dateInput, refreshToken]);

  // console.log(allTasks);
  // todo: check pagination by adding more than 20 tasks
  //todo: add search functionality with params
  
  return (
    <div className="p-4 rounded-lg border border-base-content/50  bg-base-300 my-4 ">
      {/* filters */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm">
            Viewing {showingFrom} to{" "}
            {showingTo > totalResult ? `${totalResult}` : `${showingTo}`} of{" "}
            {totalResult} results.
          </h3>
        </div>

        <div className="flex  items-center space-x-2 ">
          <label className="input input-xs rounded-lg w-3xs">
            <input
              type="search"
              className=""
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IoIosSearch className="size-5 cursor-pointer" />
          </label>
          {/* date picker */}
          <span
            className="rounded-lg w-fit cursor-pointer flex items-center"
            onClick={openDatePicker}
          >
            <HiCalendarDateRange className="size-5 hover:scale-110 transition-all " />
            <input
              ref={inputRef}
              type="date"
              name="date"
              id="date"
              className="sr-only" // hides but keeps it accessible
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </span>{" "}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 py-4 ">
        {allTasks && allTasks.length > 0
          ? allTasks.map((taskItem) => (
              <Task key={taskItem._id} task={taskItem} />
            ))
          : ""}
      </div>

      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />


    </div>
  );
};

export default AllTasksPage;
