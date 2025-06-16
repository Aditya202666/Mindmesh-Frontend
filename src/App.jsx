import React, { useEffect, useState } from "react";
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
import { refreshToken } from "./api/user/authApi";
import { registerUserData } from "./store/features/userSlice";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RootLayout from "./Layouts/RootLayout";

const App = () => {
    const [lightTheme, setLightTheme] = useState(true);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            const res = await refreshToken();
            if (res && res.success) {
                dispatch(registerUserData(res.data));
            }
        };

        getUser();
    }, [dispatch]);

    console.log("rendering");

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
            return <Navigate to={"/"} replace />;
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
                <Route element={<ProtectedRoutes />}>
                    <Route element={<RootLayout/>}>
                    <Route path="/" element={<HomePage />} />
                    </Route>
                </Route>
            </>
        )
    );

    return (
        <div
            data-theme={lightTheme ? "light" : "dark"}
            className="transition-colors h-screen duration-500"
        >
            <RouterProvider router={router} />
            <ToastContainer />
            <button
                type="button"
                className="btn btn-secondary absolute bottom-0 right-0"
                onClick={() => setLightTheme((prev) => !prev)}
            >
                change
            </button>
        </div>
    );
};

export default App;
