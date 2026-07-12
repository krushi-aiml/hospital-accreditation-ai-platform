import { FaHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSendOtp = async () => {

        if (!email) {
            setError("Please enter email");
            return;
        }

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/send-forgot-password-otp",
                {
                    email
                }
            );

            if (
                response.data.message ===
                "OTP sent successfully"
            ) {

                localStorage.setItem(
                    "resetEmail",
                    email
                );

                navigate("/reset-password");

            } else {

                setError(
                    response.data.message
                );
            }

        } catch (err) {

            setError(
                "Failed to send OTP"
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
                    Recover your account securely.
                </p>

            </div>

            <div className="flex-1 flex justify-center items-center p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white shadow-2xl rounded-3xl p-10">

                        <h2 className="text-3xl font-bold text-slate-800">
                            Forgot Password
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Enter your registered email
                        </p>

                        <div className="mt-6">

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        {error && (
                            <p className="text-red-500 mt-4">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleSendOtp}
                            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 rounded-xl font-semibold"
                        >
                            Send OTP
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;