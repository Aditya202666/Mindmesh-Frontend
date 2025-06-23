import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import AccountVerificationPage from "./pages/AccountVerificationPage";
import { registerUserData } from "./store/features/userSlice";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RootLayout from "./Layouts/RootLayout";
import MyTasksLayout from "./Layouts/MyTasksLayout";
import { refreshToken } from "./api/apiCalls/authApi";

const App = () => {
    const user = useSelector((state) => state.user);
    const theme = useSelector((state) => state.theme.theme);
    // console.log(theme);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            // console.log("getting user data");
            const res = await refreshToken();
            if (res && res.success) {
                dispatch(registerUserData(res.data));
            }
        };

        getUser();
    }, [dispatch]);

    // console.log("rendering");

    const ProtectedRoutes = () => {
        if (!user.id) {
            return <Navigate to={"/login"} replace />;
        } else if (user.id && !user.isVerified) {
            return <Navigate to={"/verify-account"} replace />;
        }
        return <Outlet />;
    };

    const RedirectFromLogin = () => {
        if (user.id && user.isVerified) {
            return <Navigate to={"/my-tasks/overview"} replace />;
        } else if (user.id && !user.isVerified) {
            return <Navigate to={"/verify-account"} replace />;
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
                        />
                        <Route
                            path="forgot-password"
                            element={<ForgotPasswordPage />}
                        />
                    </Route>
                </Route>
                <Route path="/" element={<HomePage />} />

                <Route element={<ProtectedRoutes />}>
                    <Route element={<RootLayout />}>
                        <Route path="my-tasks" element={<MyTasksLayout />}>
                            <Route path="overview">
                                <Route index element={<>overview</>} />
                                <Route
                                    path="all-tasks"
                                    element={<>all-tasks</>}
                                />
                                <Route
                                    path="completed-tasks"
                                    element={<>completed-tasks</>}
                                />
                                <Route
                                    path="pending-tasks"
                                    element={<>pending-tasks</>}
                                />
                                <Route
                                    path="overdue-tasks"
                                    element={<>overdue- tasks</>}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </>
        )
    );

    return (
        <div
            data-theme={theme}
            className="transition-colors h-screen duration-500"
        >
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
};

export default App;
