import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Task";
import { getAllTasks } from "../../api/apiCalls/personalTaskApi";
import { addOverdueTasks } from "../../store/features/personalTaskSlice";
import Pagination from "../../components/Pagination";
import SearchTasks from "../../components/SearchTasks";


const OverdueTasksPage = () => {
  const dispatch = useDispatch();

  const { overdueTasks } = useSelector((state) => state.personalTask);
  const { fromDate, refreshToken } = useSelector((state) => state.filter);

  const [dateInput, setDateInput] = useState(fromDate);
  const [searchInput, setSearchInput] = useState("");

  const [showingFrom, setShowingFrom] = useState(null);
  const [showingTo, setShowingTo] = useState(null);
  const [totalResult, setTotalResult] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  let totalPages = Math.ceil( totalResult / 20);
  if(totalPages === 0){
    totalPages = 1
  }
  // console.log(tasksInProgress);

  useEffect(() => {

    if(searchInput.length > 0) return

    const handleGetAllTasks = async () => {
      // console.log('normal')
      // console.log("here");
      const res = await getAllTasks({
        fromDate: dateInput,
        page: pageNumber,
        status: "Overdue",

      });
      if (res && res.success) {
        // console.log(res);
        dispatch(addOverdueTasks(res.data));
        setShowingFrom(res.data.taskDetails[0]?.showingFrom || 0);
        setShowingTo(res.data.taskDetails[0]?.showingTo || 0);
        setTotalResult(res.data.taskDetails[0]?.totalTasks || 0);
      }
    

    };
    handleGetAllTasks()
  }, [dispatch, dateInput ,searchInput, pageNumber, refreshToken]);

  useEffect(() => {

    if(searchInput.length < 3 ) return
    const timeoutId = setTimeout(async () => {  
      
      // console.log('search')
      const res = await getAllTasks({
        fromDate: dateInput,
        page: pageNumber,
        status: "Overdue",
        searchQuery: searchInput,
      });
      if (res && res.success) {
        // console.log(res);
        dispatch(addOverdueTasks(res.data));
        setShowingFrom(res.data.taskDetails[0]?.showingFrom || 0);
        setShowingTo(res.data.taskDetails[0]?.showingTo || 0);
        setTotalResult(res.data.taskDetails[0]?.totalTasks || 0);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      // console.log('clear')
    };
  }, [dispatch, searchInput, pageNumber, refreshToken, dateInput]);

  // console.log(allTasks);

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
        {overdueTasks && overdueTasks.length > 0
          ? overdueTasks.map((taskItem) => (
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

export default OverdueTasksPage;
