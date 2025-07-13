import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Task";
import { useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiCalendarDateRange } from "react-icons/hi2";
import { getAllTasks } from "../../api/apiCalls/personalTaskApi";
import { addAllTasks } from "../../store/features/personalTaskSlice";
import Pagination from "../../components/Pagination";
import SearchTasks from "../../components/SearchTasks";

// todo complete all task page

const AllTasksPage = () => {
  const dispatch = useDispatch();

  const { allTasks } = useSelector((state) => state.personalTask);
  const { fromDate, refreshToken } = useSelector((state) => state.filter);

  const [dateInput, setDateInput] = useState(fromDate);
  const [searchInput, setSearchInput] = useState("");

  const [showingFrom, setShowingFrom] = useState(null);
  const [showingTo, setShowingTo] = useState(null);
  const [totalResult, setTotalResult] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  const totalPages = Math.ceil(totalResult / 20);
  // console.log(pageNumber);

  useEffect(() => {

    if(searchInput) return
    // console.log('normal')
    const handleGetAllTasks = async () => {
      // console.log("here");
      const res = await getAllTasks({
        fromDate: dateInput,
        page: pageNumber,
        status: "All",
      });
      if (res && res.success) {
        dispatch(addAllTasks(res.data));
        setShowingFrom(res.data.taskDetails[0].showingFrom);
        setShowingTo(res.data.taskDetails[0].showingTo);
        setTotalResult(res.data.taskDetails[0].totalTasks);
        // console.log(res.data);
      }
    

    };
    handleGetAllTasks()
  }, [dispatch, dateInput, pageNumber, refreshToken]);

  useEffect(() => {

    if(!searchInput) return
    // console.log('search')
    const timeoutId = setTimeout(async () => {  
      
      const res = await getAllTasks({
        fromDate: dateInput,
        page: pageNumber,
        status: "All",
        searchQuery: searchInput,
      });
      if (res && res.success) {
        dispatch(addAllTasks(res.data));
        setShowingFrom(res.data.taskDetails[0].showingFrom);
        setShowingTo(res.data.taskDetails[0].showingTo);
        setTotalResult(res.data.taskDetails[0].totalTasks);
        // console.log(res.data);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, searchInput, pageNumber, refreshToken, dateInput]);

  // console.log(allTasks);
  // todo: check pagination by adding more than 20 tasks
  //todo: add search functionality with params

  return (
    <div className="p-4 rounded-lg border border-base-content/50  bg-base-300 my-4 ">
      {/* filters */}

      <SearchTasks
        dateInput={dateInput}
        searchInput={searchInput}
        setDateInput={setDateInput}
        setSearchInput={setSearchInput}
        setPageNumber={setPageNumber}
        showingFrom={showingFrom}
        showingTo={showingTo}
        totalResult={totalResult}
      />

      <div className="flex flex-wrap items-center justify-center gap-4 py-4 ">
        {allTasks && allTasks.length > 0
          ? allTasks.map((taskItem) => (
              <Task key={taskItem._id} task={taskItem} />
            ))
          : ""}
      </div>

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AllTasksPage;
