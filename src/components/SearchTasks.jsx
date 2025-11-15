import React, { useRef } from "react";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";

const SearchTasks = ({
  showingFrom,
  showingTo,
  totalResult,
  searchInput,
  setSearchInput,
  setPageNumber,
  dateInput,
  setDateInput,
}) => {

    const inputRef = useRef(null);


  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      ``;
    }
  };

  const handleSearchInput = (e) =>{

    setPageNumber(1)
    setSearchInput(e.target.value)
  }


  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-bold text-sm">
          Viewing {showingFrom} to{" "}
          {showingTo > totalResult ? `${totalResult}` : `${showingTo}`} of{" "}
          {totalResult} results. 
        </h3>
        <p className="text-xs">Filter by date: {dateInput}</p>
      </div>

      <div className="flex  items-center space-x-2 ">
        <label className="input input-xs rounded-lg w-3xs">
          <input
            type="search"
            className=""
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInput}
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
            value={dateInput || ""}
            onChange={(e) => setDateInput(e.target.value)}
          />
        </span>{" "}
      </div>
    </div>
  );
};

export default SearchTasks;
