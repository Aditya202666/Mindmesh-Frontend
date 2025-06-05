import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import mindmeshLogo from "../assets/mindmeshLogo.png";
import { FaClipboardUser } from "react-icons/fa6";
import { loginUser } from "../api/user/authApi";
import { registerUserData } from "../store/features/user/userSlice";
import { useDispatch } from "react-redux";

//todo add avatar functionality

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLogging, setIsLogging] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        setIsLogging(true);
        const formData = { username, email, password };
        const res = await loginUser(formData);
        console.log(res);
        if (res && res.success) {
            dispatch(registerUserData(res.data));
            navigate("/");
        }

        setIsLogging(false);
    };
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center my-8 gap-6 w-full h-full">
            <div className="absolute top-2 left-2 flex items-center">
                <img className="h-8 lg:h-10" src={mindmeshLogo} alt="" />
            </div>
            <h1 className="font-bold fixed top-55 z-10 text-2xl md:text-4xl">
                <p className="">Welcome Back!</p>
                <p className="text-center text-sm font-normal ">Get Started with your tasks.</p>
            </h1>

            {/* form */}
            <form
                onSubmit={handleRegisterSubmit}
                className="flex flex-col justify-center items-center mt-25"
            >
                {" "}
                {/* username */}
                <label className="input validator rounded-xl ">
                    <FaClipboardUser />
                    <input
                        type="text"
                        required
                        value={username}
                        placeholder="Username or Email"
                        minLength="3"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setUsername(e.target.value);
                        }}
                        title="Only letters & numbers of length 3-20."
                    />
                </label>
                <p className="validator-hint text-error-content  text-xs mt-0 mb-0.5">
                    Must be at least 3 characters.
                </p>
                {/* password */}
                <label className="relative input validator rounded-xl ">
                    <FaKey />
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        minLength="8"
                        maxLength="25"
                        title="Must be 8-25 characters"
                    />
                    <button onClick={handleShowPassword} type="button" className="cursor-pointer">
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </label>
                <p className="validator-hint text-left text-error-content text-xs mt-0 mb-0.5">
                    Must be 8-25 characters
                </p>
                <button
                    className="btn rounded-xl w-4/5 btn-secondary"
                    disabled={isLogging}
                >
                    {isLogging ? (
                        <span className="loading loading-ring text-secondary loading-md"></span>
                    ) : (
                        "Login"
                    )}
                </button>
                <Link
                    to={"/forgot-password"}
                    className="mt-2 text-xs underline cursor-pointer"
                >
                    Forgot Password?
                </Link>
                <p className="text-xs">
                    Don't have an account.{" "}
                    <Link to={"/register"} className="underline">
                        Register?
                    </Link>{" "}
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
