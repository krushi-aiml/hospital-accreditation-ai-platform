import { FaHospital } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function VerifyOtp() {

    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const handleVerify = async () => {

        const signupData = JSON.parse(
            localStorage.getItem("signupData")
        );

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/verify-signup-otp",
                {
                    name: signupData.name,
                    email: signupData.email,
                    password: signupData.password,
                    otp: otp
                }
            );

            if (
                response.data.message ===
                "Account created successfully"
            ) {

                localStorage.removeItem(
                    "signupData"
                );

                alert(
                    "Account Created Successfully"
                );

                navigate("/login");

            } else {

                setError(
                    response.data.message
                );
            }

        } catch (err) {

            console.log(err);

            console.log(err.response);

            if (err.response) {

                setError(err.response.data.message);

            } else {

                setError("Server not responding");
            }

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
                    Verify your email to complete registration.
                </p>

            </div>

            <div className="flex-1 flex justify-center items-center p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white shadow-2xl rounded-3xl p-10">

                        <h2 className="text-3xl font-bold text-slate-800">
                            Verify OTP
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Enter the OTP sent to your email
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
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        {error && (
                            <p className="text-red-500 mt-4">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleVerify}
                            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:scale-105 transition duration-300"
                        >
                            Verify OTP
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );


}

export default VerifyOtp;
