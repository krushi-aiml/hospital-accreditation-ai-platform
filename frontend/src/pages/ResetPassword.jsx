import { FaHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleResetPassword = async () => {

        const email = localStorage.getItem(
            "resetEmail"
        );

        if (
            !otp ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill all fields");
            return;
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain 8+ characters, uppercase, lowercase, number and special character"
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Passwords do not match"
            );
            return;
        }

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/reset-password",
                {
                    email,
                    otp,
                    password
                }
            );

            if (
                response.data.message ===
                "Password reset successful"
            ) {

                localStorage.removeItem(
                    "resetEmail"
                );

                alert(
                    "Password Reset Successful"
                );

                navigate("/login");

            } else {

                setError(
                    response.data.message
                );
            }

        } catch (err) {

            setError(
                "Password reset failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">

            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 text-white p-12 flex-col justify-center">

                <div className="flex items-center gap-3">
                    <FaHospital size={35} />
                    <h1 className="text-3xl font-bold">
                        Hospital Accreditation AI
                    </h1>
                </div>

                <p className="mt-4 text-lg text-green-100">
                    Create a new secure password.
                </p>

            </div>

            <div className="flex-1 flex justify-center items-center p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white shadow-2xl rounded-3xl p-10">

                        <h2 className="text-3xl font-bold text-slate-800">
                            Reset Password
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Enter OTP and new password
                        </p>

                        <div className="mt-6">

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                    setError("");
                                }}
                                className="w-full p-4 border rounded-xl"
                            />

                        </div>

                        <div className="mt-4">

                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                className="w-full p-4 border rounded-xl"
                            />

                        </div>

                        <div className="mt-4">

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                                className="w-full p-4 border rounded-xl"
                            />

                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                            Password must contain:
                            <br />
                            • 8+ characters
                            <br />
                            • Uppercase letter
                            <br />
                            • Lowercase letter
                            <br />
                            • Number
                            <br />
                            • Special character
                        </p>

                        {error && (
                            <p className="text-red-500 mt-4">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleResetPassword}
                            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 rounded-xl font-semibold"
                        >
                            Reset Password
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;