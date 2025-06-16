import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarImage from '../assets/avatar.png'
import { FaEye, FaEyeSlash, FaKey, FaMailBulk, FaUser } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { BiCamera } from "react-icons/bi";
import { registerUser } from "../api/user/authApi";
import { registerUserData } from "../store/features/userSlice";
import { useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { FcOk } from "react-icons/fc";
import { toast } from "react-toastify";
import { checkUsername } from "../api/user/userApi";


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState({});
    const [avatarPreview, setAvatarPreview] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!isUsernameValid) {
            toast("Username is unavailable.");
            return;
        }
        setIsRegistering(true);
        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("username", username);
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("password", password);

        const res = await registerUser(formData);
        if (res && res.success) {
            dispatch(registerUserData(res.data));
            navigate("/verify-account");
        }
        setIsRegistering(false);
    };
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast("Only image files are allowed.");
            return;
        }
        setIsLoadingAvatar(true);
        setAvatar(file);
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
        setIsLoadingAvatar(false);
    };

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (username.trim().length < 3) return;
            const res = await checkUsername({ username });
            setIsUsernameValid(res.success);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [username]);

    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    return (
        <div className="flex flex-col items-center justify-center my-8 gap-6 w-full h-full">
            <h1 className="font-bold text-2xl md:text-4xl">
                Register Account
            </h1>

            {/* form */}
            <form
                onSubmit={handleRegisterSubmit}
                className="flex flex-col justify-center items-center w-full "
            >
                {" "}
                {/* avatar */}
                <div className="avatar border-8 border-base-100  rounded-full my-6">
                    <div className="relative w-24 rounded-full ">
                        <img
                            className="object-cover w-full h-full"
                            src={avatarPreview || avatarImage}
                            alt="avatar"
                        />
                        {isLoadingAvatar && (
                            <span className="absolute z-10 top-8 left-8 loading loading-ring loading-xl"></span>
                        )}
                    </div>
                    <label
                        htmlFor="avatar"
                        className="absolute bg-secondary border border-secondary flex justify-center items-center rounded-full bottom-0 right-0 size-6 cursor-pointer hover:scale-110 active:scale-95 transition-all"
                    >
                        <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            name="avatar"
                            id="avatar"
                            disabled={isLoadingAvatar}
                            onChange={handleAvatarUpload}
                        />
                        <BiCamera className="text-secondary-content" />
                    </label>
                </div>
                {/* fullname */}
                <label className="input validator rounded-xl ">
                    <FaClipboardUser />
                    <input
                        type="text"
                        required
                        value={fullname}
                        placeholder="Fullname"
                        pattern="^[a-zA-Z0-9\s]+$"
                        minLength="3"
                        maxLength="20"
                        onChange={(e) => setFullname(e.target.value)}
                        title="Only letters, numbers or space"
                    />
                </label>
                <p className="validator-hint text-error-content  text-xs mt-0 mb-0.5">
                    Must be 3-20 characters alphanumeric characters.
                </p>
                {/* username */}
                <label className="input validator rounded-xl ">
                    <FaUser />
                    <input
                        type="text"
                        required
                        value={username}
                        placeholder="Username"
                        pattern="^[a-zA-Z0-9]+$"
                        minLength="3"
                        maxLength="20"
                        onChange={(e) => setUsername(e.target.value)}
                        title="Only letters & numbers of length 3-20."
                    />
                    {username && (
                        <button>
                            {isUsernameValid ? (
                                <FcOk className="text-success " />
                            ) : (
                                <ImCross className="text-error" />
                            )}
                        </button>
                    )}
                </label>
                <p className="validator-hint text-error-content  text-xs mt-0 mb-0.5">
                    Only letters & numbers of length 3-20.
                </p>
                {/* email */}
                <label className="input validator rounded-xl ">
                    <FaMailBulk />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email@example.com"
                        title="Enter valid email address"
                    />
                </label>
                <p className="validator-hint text-left text-error-content text-xs mt-0 mb-0.5">
                    Enter valid email address
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
                    className="btn rounded-xl btn-wide btn-secondary"
                    disabled={isRegistering}
                >
                    {isRegistering ? (
                        <span className="loading loading-ring text-secondary loading-md"></span>
                    ) : (
                        "SignUp"
                    )}
                </button>
                <p className="text-xs mt-1">
                    Already have an account.{" "}
                    <Link to={"/login"} className="underline">
                        Login?
                    </Link>{" "}
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
