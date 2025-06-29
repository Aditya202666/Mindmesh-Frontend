import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
    getAccountVerificationOtp,
    verifyAccount,
} from "../../api/apiCalls/authApi";
import { registerUserData } from "../../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaKey } from "react-icons/fa";
import Timer from "../../components/Timer";

const AccountVerificationPage = () => {
    const user = useSelector((state) => state.user);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);

    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        console.log(otp);
        setIsVerifying(true);
        const res = await verifyAccount({ otp });
        console.log(res);
        if (res && res.success) {
            dispatch(registerUserData(res.data));
            navigate("/my-tasks");
        }

        setIsVerifying(false);
    };

    const handleResendOtp = () => {
        if (!isCooldown) {
            getAccountVerificationOtp();
            setIsCooldown(true);
        }
    };

    useEffect(() => {
        if (user.id) {
            getAccountVerificationOtp();
            setIsCooldown(true);
        }
    }, [user.id]);

    if (!user.id) return <Navigate to={"/login"} />;
    // console.log('render')
    return (
        <div className="flex flex-col items-center justify-center my-8 gap-6 w-full h-full">
            <h1 className="font-bold  text-2xl md:text-4xl">
                <p className="">Verify your account!</p>
                <p className="text-center text-sm font-normal mt-0.5 ">
                    Otp sent to your email address.
                </p>
            </h1>

            {/* form */}
            <form
                onSubmit={handleVerify}
                className="flex flex-col justify-center items-center w-full"
            >
                {" "}
                {/* username */}
                <label className="input validator rounded-xl ">
                    <FaKey />
                    <input
                        type="text"
                        required
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
                <p className="validator-hint text-error-content  text-xs mt-0 mb-0.5">
                    Must be 6 digits.
                </p>
                {/* password */}
                <button
                    className="btn rounded-xl btn-wide btn-secondary shadow border-black/20"
                    disabled={isVerifying}
                >
                    {isVerifying ? (
                        <span className="loading loading-dots text-info loading-md"></span>
                    ) : (
                        "Verify"
                    )}
                </button>
                <span className="mt-2">
                    <span
                        onClick={handleResendOtp}
                        className={`text-xs font-semibold underline  ${
                            isCooldown
                                ? " text-base-content/70 cursor-not-allowed"
                                : "cursor-pointer"
                        } `}
                    >
                        Resend Otp?
                    </span>{" "}
                    {
                        <Timer
                            time={30}
                            trigger={isCooldown}
                            setTrigger={setIsCooldown}
                            classes={"text-xs"}
                        />
                    }
                </span>
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

export default AccountVerificationPage;
