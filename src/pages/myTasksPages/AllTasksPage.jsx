import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Task";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BsCalendar } from "react-icons/bs";
import { HiCalendarDateRange } from "react-icons/hi2";

// todo complete all task page

const AllTasksPage = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { allTasks } = useSelector((state) => state.personalTask);
  const { fromDate } = useSelector((state) => state.filter);

  const [dateInput, setDateInput] = useState(fromDate)  
  const [searchInput, setSearchInput] = useState("")

  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.(); 
    }
  };

  console.log(allTasks);
  return (
    <div className="">
      {/* filters */}
      <div className="flex  items-center space-x-2 ">
        <label className="input input-xs rounded-lg ml-auto">
          <input type="search" className="" placeholder="Search" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} />
          <IoIosSearch className="size-5 cursor-pointer" />
        </label>
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

      {allTasks && allTasks.length > 0
        ? allTasks.map((taskItem) => <Task task={taskItem} />)
        : ""}
    </div>
  );
};

export default AllTasksPage;
