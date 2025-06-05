import React from "react";
import { Outlet } from "react-router-dom";
import mindmeshLogo from "../assets/mindmeshLogo.png";

const AuthLayout = () => {

    
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center mx-auto max-w-7xl">

            <div className="relative shadow-xs shadow-black flex gap-4 w-11/12 h-11/12 bg-base-300 p-2 md:p-4 rounded-xl">
                <div className=" hidden lg:flex lg:w-1/2 h-full justify-center items-center rounded-xl ">
                    <header className="flex flex-col justify-center items-center">
                        <img src={mindmeshLogo} alt="Mindmesh logo" />
                        <div className="text-center">
                            <h1 className="font-bold text-4xl">
                                Welcome To MindMesh
                            </h1>
                            <h3 className="text-sm">
                                A Team Project Task Management App{" "}
                            </h3>
                        </div>
                    </header>
                </div>
                <div className="lg:w-1/2 h-full w-screen flex justify-center items-center rounded-xl bg-base-300">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
