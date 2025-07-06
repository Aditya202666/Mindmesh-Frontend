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

// todo add task page, edit task page
// todo add subtask functionalities

const App = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

  // console.log(theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsSigningUpTrue());
    const getUser = async () => {
      // console.log("getting user data");

      const res = await refreshToken();
      if (res && res.success) {
        dispatch(registerUserData(res.data));
      } else {
        dispatch(setIsSigningUpFalse());
        dispatch(setIsLoadingFalse());
      }
    };

    getUser();
  }, [dispatch]);

  // console.log("rendering");

  const ProtectedRoutes = () => {
    if (user.isSigningUp || user.isLoading) {
      console.log("loading protected routes");
      return null;
    }
    if (!user.id) {
      console.log("user not logged in" + user);
      return <Navigate to={"/login"} replace />;
    } else if (user.id && !user.isVerified) {
      return <Navigate to={"/verify-account"} replace />;
    }
    return <Outlet />;
  };

  console.log(user);

  const RedirectFromLogin = () => {
    const location = useLocation();
    if (user.isSigningUp) {
      console.log("loading");
      return null;
    }
    if (user.id && user.isVerified) {
      if (location.pathname !== "/my-tasks/overview") {
        return <Navigate to={"/my-tasks/overview"} replace />;
      }
    } else if (user.id && !user.isVerified) {
      if (location.pathname !== "/verify-account") {
        return <Navigate to={"/verify-account"} replace />;
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
            <Route
              path="verify-account"
              element={<AccountVerificationPage />}
              // element={<>AccountVerificationPage</>}
            />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Route>

        //HomePage
        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<RootLayout />}>
          
            <Route path="my-tasks" element={<MyTasksLayout />}>
              <Route path="overview">

                <Route index element={<MyTasksOverviewPage />} />

                <Route path=":taskId" element={<>My Task</>} />
                <Route path="all-tasks" element={<AllTasksPage/>} />
                <Route path="in-progress-tasks" element={<>in-progress</>} />
                <Route path="completed-tasks" element={<>completed-tasks</>} />
                <Route path="pending-tasks" element={<>pending-tasks</>} />
                <Route path="overdue-tasks" element={<>overdue- tasks</>} />

              </Route>
            </Route>

          </Route>
        </Route>
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
