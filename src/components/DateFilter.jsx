import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFromDate } from "../store/features/filterSlice";


const DateFilter = () => {

    const date = useSelector((state) => state.filter.fromDate);
    const dispatch = useDispatch(); 
    const [dateInput, setDateInput] = useState(date);
    // console.log(date)

    

    const handleDateChange = (e) => {
        e.preventDefault();
        setDateInput(e.target.value);
        dispatch(setFromDate(e.target.value));
    };

    return (
        <details className="dropdown dropdown-end">
            <summary className="btn btn-circle btn-secondary m-1 shadow ">
                <FaClock  />{" "}
            </summary>
            <ul className="menu dropdown-content bg-base-300 rounded-lg z-1 p-2 shadow">
                    <label className="label">
                        From
                        <input
                            className="input input-xs rounded-lg "
                            type="date"
                            name="date"
                            id="date"
                            value={dateInput}
                            onChange={handleDateChange}
                        />
                    </label>
            </ul>
        </details>
    );
};

export default DateFilter;
