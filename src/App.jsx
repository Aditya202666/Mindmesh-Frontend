import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/authPages/LoginPage";
import RegisterPage from "./pages/authPages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import AccountVerificationPage from "./pages/authPages/AccountVerificationPage";
import {
  registerUserData,
  setIsLoadingFalse,
  setIsSigningUpFalse,
  setIsSigningUpTrue,
} from "./store/features/userSlice";
import ForgotPasswordPage from "./pages/authPages/ForgotPasswordPage";
import RootLayout from "./Layouts/RootLayout";
import MyTasksLayout from "./Layouts/MyTasksLayout";
import { refreshToken } from "./api/apiCalls/authApi";
import MyTasksOverviewPage from "./pages/myTasksPages/MyTasksOverviewPage";
import AllTasksPage from "./pages/myTasksPages/AllTasksPage";
import PersonalTaskPage from "./pages/myTasksPages/PersonalTaskPage";
import EditPersonalTaskPage from "./pages/myTasksPages/EditPersonalTaskPage";
import InProgressTasksPage from "./pages/myTasksPages/InProgressTasksPage";
import CompletedTasksPage from "./pages/myTasksPages/CompletedTasksPage";
import PendingTasksPage from "./pages/myTasksPages/PendingTasksPage";
import OverdueTasksPage from "./pages/myTasksPages/OverdueTasksPage";
import { addAllProjects } from "./store/features/personalTaskSlice";
import ProjectPage from "./pages/myTasksPages/ProjectPage";
import NotFound from "./pages/Not-Found";

// todo design dashboard layout and related pages, controllers and api calls etc. similar to my tasks

const App = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const projects = useSelector((state) => state.personalTask.projects);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsSigningUpTrue());
    const getUser = async () => {
      // console.log("getting user data");

      const res = await refreshToken();
      if (res && res.success) {
        dispatch(registerUserData(res.data.user));
        dispatch(addAllProjects(res.data.projects));
      } else {
        dispatch(setIsSigningUpFalse());
        dispatch(setIsLoadingFalse());
      } 
    };

    getUser();
  }, [dispatch]);

  const CheckProjectProtectedRoute = () => {
    if (projects.length === 0) return <Navigate to="/my-tasks/overview" replace={true} />;
    else return <Outlet />;
  };

  const ProtectedRoutes = () => {
    if (user.isSigningUp || user.isLoading) {
      // console.log("loading protected routes");
      return null;
    }
    if (!user.id) {
      // console.log("user not logged in" + user);
      return <Navigate to={"/login"} replace />;
    } else if (user.id && !user.isVerified) {
      if (location.pathname !== "/verify-account") {
        return <Navigate to={"/verify-account"} replace />;
      }
    }
    return <Outlet />;
  };

  // console.log(user);

  const RedirectFromLogin = () => {
    const location = useLocation();
    if (user.isSigningUp) {
      // console.log("loading");
      return null;
    } else if (!user.id) {
      if (location.pathname === "/verify-account") {
        return <Navigate to={"/login"} replace />;
      }
    } else if (user.id && user.isVerified) {
      if (location.pathname !== "/my-tasks/overview") {
        return <Navigate to={"/my-tasks/overview"} replace />;
      }
    }
    return <Outlet />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RedirectFromLogin />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="verify-account"
              element={<AccountVerificationPage />}
            />
          </Route>
        </Route>

        {/* HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* MyTasks Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<RootLayout />}>
            <Route path="my-tasks" element={<MyTasksLayout />}>
              <Route index path="overview" element={<MyTasksOverviewPage />} />

              <Route path=":taskId/edit" element={<EditPersonalTaskPage />} />
              <Route path=":taskId" element={<PersonalTaskPage />} />
              <Route path="all-tasks" element={<AllTasksPage />} />
              <Route
                path="in-progress-tasks"
                element={<InProgressTasksPage />}
              />
              <Route path="completed-tasks" element={<CompletedTasksPage />} />
              <Route path="pending-tasks" element={<PendingTasksPage />} />
              <Route path="overdue-tasks" element={<OverdueTasksPage />} />
              <Route element={<CheckProjectProtectedRoute />}>
              <Route path="project/:id" element={<ProjectPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
        // not-found route
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <div data-theme={theme} className="transition-colors h-screen duration-500">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
