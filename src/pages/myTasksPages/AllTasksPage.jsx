import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Task";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiCalendarDateRange } from "react-icons/hi2";
import { getAllTasks } from "../../api/apiCalls/personalTaskApi";
import { addAllTasks } from "../../store/features/personalTaskSlice";

// todo complete all task page

const AllTasksPage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { allTasks } = useSelector((state) => state.personalTask);
  const { fromDate, refreshToken } = useSelector((state) => state.filter);

  const [dateInput, setDateInput] = useState(fromDate);
  const [searchInput, setSearchInput] = useState("");

  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();``
    }
  };

  useEffect(() => {
    const handleGetAllTasks = async () => {
      console.log("here");
      const res = await getAllTasks({ fromDate: dateInput });
      if (res && res.success) {
        dispatch(addAllTasks(res.data));
      }
    };
    handleGetAllTasks();
  }, [dispatch, dateInput, refreshToken]);

  // console.log(allTasks);
  return (
    <div className="py-4">
      {/* filters */}
      <div className="flex  items-center space-x-2 mr-1 ">
        <label className="input input-xs rounded-lg ml-auto">
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
      <div className="flex flex-wrap gap-4 py-4">

      {allTasks && allTasks.length > 0
        ? allTasks.map((taskItem) => <Task key={taskItem._id} task={taskItem} />)
        : ""}
        </div>
    </div>
  );
};

export default AllTasksPage;
