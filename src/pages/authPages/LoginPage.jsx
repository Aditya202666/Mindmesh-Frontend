import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { loginUser } from "../../api/apiCalls/authApi";
import { registerUserData } from "../../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addAllProjects } from "../../store/features/personalTaskSlice";

const LoginPage = () => {
  const user = useSelector((state) => state.user);
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
      dispatch(registerUserData(res.data.user));
      dispatch(addAllProjects(res.data.projects));
      navigate("/my-tasks");
    }

    setIsLogging(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (user.id && user.isVerified) return <Navigate to={"/my-tasks"} replace />;
  if (user.id && !user.isVerified)
    return <Navigate to={"/verify-account"} replace />;
  // console.log('login')
  return (
    <div className="flex flex-col items-center justify-center my-8 gap-6 w-full h-full">
      {/* <div className="absolute top-2 left-2 flex items-center">
                <img className="h-8 lg:h-10" src={mindmeshLogo} alt="" />
            </div> */}
      <h1 className="font-bold top-20 z-10 text-2xl md:text-4xl">
        <p className="">Welcome Back!</p>
        <p className="text-center text-sm font-normal ">
          Get started with your tasks.
        </p>
      </h1>

      {/* form */}
      <form
        onSubmit={handleRegisterSubmit}
        className="flex flex-col justify-center items-center w-full"
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
          <button
            onClick={handleShowPassword}
            type="button"
            className="cursor-pointer"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </label>
        <p className="validator-hint text-left text-error-content text-xs mt-0 mb-0.5">
          Must be 8-25 characters
        </p>
        <button
          className="btn rounded-xl btn-wide btn-secondary border-black/20 shadow"
          disabled={isLogging}
        >
          {isLogging ? (
            <span className="loading loading-dots text-info loading-md"></span>
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
          <Link to={"/register"} className="underline ">
            Register?
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
