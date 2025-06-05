import React from "react";
import { ToastContainer } from "react-toastify";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<>Forgot password</>} />
                </Route>
                <Route index element={<HomePage/>} />
            </>
        )
    );

    return (
        <div data-theme="light">
            <RouterProvider router={router} />
            <ToastContainer />
        </div>
    );
};

export default App;
