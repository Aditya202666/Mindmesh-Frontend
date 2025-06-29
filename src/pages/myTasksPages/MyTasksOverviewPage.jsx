import React from "react";
import Filters from "../../components/Filters";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const MyTasksOverviewPage = () => {
    const { overdueLastMonth, dueInSevenDays, recentTask } = useSelector(
        (state) => state.personalTask
    );
    const navigate = useNavigate();

    console.log(recentTask[0]);
    return (
        <div className="mt-6">
            <div className="w-full border rounded-t-3xl rounded-b-xl border-base-content/20 bg-base-300">
                <div>
                    <h1 className="flex items-baseline justify-between bg-error/50 py-2 pl-4 rounded-t-3xl font-semibold text-error-content border-b border-base-content/20">
                        Overdue Last Month
                        <Link
                            to={"all-tasks"}
                            className="mr-4 text-xs underline"
                        >
                            {" "}
                            View All
                        </Link>
                    </h1>
                </div>
                <div className="flex gap-2 m-2 overflow-scroll scrollbar-hide">
                    {overdueLastMonth.length > 0
                        ? recentTask.map((task) => (
                              <div
                                  key={task._id}
                                  className="relative space-y-2 min-w-3xs h-60 border border-base-content/20 bg-error/50 rounded-xl p-2"
                              >
                                  <details className="dropdown dropdown-end absolute right-0 top-0 ">
                                      <summary className="btn btn-sm btn-error bg-transparent/50 m-1 p-0 ">
                                          <BsThreeDotsVertical className="text-lg" />
                                      </summary>
                                      <ul className="menu dropdown-content bg-base-300 rounded-box z-1 w-40 text-xs font-medium p-0 shadow-sm">
                                          <li>
                                              <Link to={"/my-tasks/:taskId"}>
                                                  Open
                                              </Link>
                                          </li>
                                          <li>
                                              <Link to={"/my-tasks/:taskId"} target="_blank" rel="noopener noreferrer">
                                                  Open in New Tab
                                              </Link>
                                          </li>
                                          <li>
                                              <a>Mark as Completed</a>
                                          </li>
                                          <li>
                                              <a>Delete</a>
                                          </li>
                                      </ul>
                                  </details>
                                  <div className="flex flex-col gap-1 w-full`">
                                      <h1 className="line-clamp-2 text-sm font-medium w-15/16 ">
                                          Lorem ipsum dolor sit, amet conse
                                          ctetur adipisicin
                                      </h1>
                                      <p className="line-clamp-4 text-xs text-base-content/90">
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Quisquam, earum neque excepturi
                                          dolore, voluptatem explicabo
                                          asperiores quia, recusandae eos
                                          corporis totam praesentium dolorem
                                          aspernatur qua
                                      </p>
                                  </div>
                                  <div className="flex space-x-2 text-sm">
                                      <div>
                                          <span className="text-base-content/70 text-xs">
                                              Status:
                                          </span>
                                          <span className="text-xs font-medium border border-base-content/50 px-1 rounded-md ml-1">
                                              {` ` + task.status}
                                          </span>
                                      </div>
                                      <div>
                                          <span className="text-base-content/70 text-xs">
                                              Priority:
                                          </span>
                                          <span className="text-xs font-medium border border-base-content/50 px-1 rounded-md ml-1">
                                              {` ` + task.priority}
                                          </span>
                                      </div>
                                      {/* <span className="border rounded-xl px-1">
                                          {task.dueDate.split("T")[0]}
                                      </span> */}
                                  </div>
                              </div>
                          ))
                        : ""}
                    {/* <Filters /> */}
                </div>
            </div>
        </div>
    );
};

export default MyTasksOverviewPage;
