import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getForgotPasswordOtp, verifyForgotPasswordOtp } from "../api/user/authApi";
import { registerUserData } from "../store/features/userSlice";
import { useDispatch } from "react-redux";
import { FaKey, FaMailBulk } from "react-icons/fa";
import Timer from "../components/Timer";


const ForgotPasswordPage = () => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);

    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsVerifying(true);

        const res = await verifyForgotPasswordOtp({ email, otp });
        // console.log(res);
        if (res && res.success) {
            dispatch(registerUserData(res.data));
            navigate("/my-tasks");
        }

        setIsVerifying(false);
    };

    const handleSendOtp = () => {

        if (!isCooldown) {
            getForgotPasswordOtp({email});
            setIsCooldown(true);
            setIsOtpSent(true)
        }
    };


    return (
        <div className="flex flex-col items-center justify-center my-8 gap-6 w-full h-full">
            <h1 className="font-bold  text-2xl md:text-4xl text-center">
                <p className="">Forgot Your Password?</p>
                <p className="text-center text-sm font-normal mt-0.5 ">
                    Don’t worry — it happens.
                </p>
            </h1>

            {/* form */}
            <form
                onSubmit={handleVerify}
                className="flex flex-col gap-2 justify-center items-center w-full"
            >
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
                {/* OTP */}

                <label className="input validator rounded-xl ">
                    <FaKey />
                    <input
                        type="text"
                        required
                        disabled={!isOtpSent}
                        value={otp}
                        placeholder="Otp"
                        minLength={6}
                        maxLength={6}
                        onChange={(e) => {
                            setOtp(e.target.value);
                        }}
                        title="Must be 6 digits"
                    />
                </label>
                <div className="md:flex gap-2 space-y-2 justify-center mt-2">
                    <button
                        className="btn rounded-xl btn-wide btn-primary"
                        onClick={handleSendOtp}
                        disabled={isCooldown || !email}
                        type="button"
                    >
                        {!isCooldown ? (
                            "Send Otp"
                        ) : (
                            <span>
                                Resend in{" "}
                                <Timer
                                    time={30}
                                    trigger={isCooldown}
                                    setTrigger={setIsCooldown}
                                    classes={"text-xs"}
                                />
                            </span>
                        )}
                    </button>
                    <button
                        className="btn rounded-xl btn-wide btn-secondary"
                        disabled={isVerifying}
                    >
                        {isVerifying ? (
                            <span className="loading loading-ring text-secondary loading-md"></span>
                        ) : (
                            "Verify"
                        )}
                    </button>
                </div>

                <p className="text-xs">
                    Already have an account.{" "}
                    <Link to={"/login"} className="underline">
                        Login?
                    </Link>{" "}
                </p>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
