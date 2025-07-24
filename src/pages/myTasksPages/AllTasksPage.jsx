import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/Task";
import { getAllTasks } from "../../api/apiCalls/personalTaskApi";
import { addAllTasks } from "../../store/features/personalTaskSlice";
import Pagination from "../../components/Pagination";
import SearchTasks from "../../components/SearchTasks";


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

  let totalPages = Math.ceil( totalResult / 20);
  if(totalPages === 0){
    totalPages = 1
  }

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
        setShowingFrom(res.data.taskDetails[0]?.showingFrom || 0);
        setShowingTo(res.data.taskDetails[0]?.showingTo || 0);
        setTotalResult(res.data.taskDetails[0]?.totalTasks || 0);
        // console.log(res.data);
      }
    

    };
    handleGetAllTasks()
  }, [dispatch, dateInput,searchInput, pageNumber, refreshToken]);

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
        // console.log(res.data);
        dispatch(addAllTasks(res.data));
        setShowingFrom(res.data.taskDetails[0]?.showingFrom || 0);
        setShowingTo(res.data.taskDetails[0]?.showingTo || 0);
        setTotalResult(res.data.taskDetails[0]?.totalTasks || 0);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
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

      <div className="flex flex-wrap items-center justify-center gap-4 py-4 mt-2">
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
