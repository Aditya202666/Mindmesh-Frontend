import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    resetFilters,
    setFromDate,
    setOrderBy,
    setPriority,
    setStatus,
} from "../store/features/filterSlice";
import { RiResetLeftLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";

const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filter);
    console.log(filters);
    return (
        <details className="dropdown dropdown-end">
          <summary className="btn btn-neutral btn-sm rounded-xl p-2 border border-base-content/20"><FaFilter/></summary>
            <form className="menu dropdown-content flex flex-col gap-1 p-1 mt-1 bg-base-300 rounded-lg items-center border border-base-content/20 w-45">
                {/* add multiple select filters for status, priority, sort */}

                <label className="select select-xs cursor-pointer rounded-lg w-full">
                    <span className="label">Status</span>
                    <select
                        className="max-w-xs rounded-lg cursor-pointer"
                        value={filters.status}
                        onChange={(e) => dispatch(setStatus(e.target.value))}
                    >
                        <option>All</option>
                        <option>To-do</option>
                        <option>In-Progress</option>
                        <option>Completed</option>
                        <option>Overdue</option>
                    </select>
                </label>
                <label className="select select-xs cursor-pointer rounded-lg w-full">
                    <span className="label  cursor-pointer">Priority</span>
                    <select
                        className="max-w-xs rounded-lg"
                        value={filters.priority}
                        onChange={(e) => dispatch(setPriority(e.target.value))}
                    >
                        <option>All</option>
                        <option>None</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </label>
                <label className="select select-xs cursor-pointer rounded-lg w-full">
                    <span className="label  cursor-pointer">Sort</span>
                    <select
                        className="max-w-xs rounded-lg"
                        value={filters.ascending}
                        onChange={(e) => dispatch(setOrderBy(e.target.value))}
                        // onChange={(e) => console.log(e.target.value)}
                    >
                        <option value={true}>Ascending</option>
                        <option value={false}>Descending</option>
                    </select>
                </label>
                <label className="fieldset flex w-full">
                    <span className="input input-xs rounded-lg ">
                    <span className="label">From</span>
                    <input
                        className="place-content-around"
                        placeholder="From"
                        type="date"
                        name="date"
                        id="date"
                        value={filters.fromDate}
                        onChange={(e) => dispatch(setFromDate(e.target.value))}
                        // onChange={(e)=>console.log(e.target.value)}
                        
                        />
                        </span>
                </label>
                <button
                    type="button"
                    className="btn btn-xs btn-error btn-wide border border-base-content/20 rounded-lg"
                    onClick={() => dispatch(resetFilters())}
                >
                    Reset
                </button>
            </form>
        </details>
    );
};

export default Filters;
