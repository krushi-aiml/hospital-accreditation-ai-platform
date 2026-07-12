import { FaHospital, FaShieldAlt, FaFileMedical, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {


    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {

        if (
            !name ||
            !email ||
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
            setError("Passwords do not match");
            return;
        }

        try {

            await axios.post(
                "http://127.0.0.1:8000/send-signup-otp",
                {
                    email
                }
            );

            localStorage.setItem(
                "signupData",
                JSON.stringify({
                    name,
                    email,
                    password
                })
            );

            navigate("/verify-otp");

        } catch (err) {

            setError(
                "Failed to send OTP"
            );
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">

            {/* LEFT SECTION */}

            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 text-white p-12 flex-col justify-between">

                <div>
                    <div className="flex items-center gap-3">
                        <FaHospital size={35} />
                        <h1 className="text-3xl font-bold">
                            Hospital Accreditation AI
                        </h1>
                    </div>

                    <p className="mt-4 text-lg text-green-100">
                        AI-Powered Compliance Monitoring & Accreditation Management
                    </p>
                </div>

                <div className="space-y-6">

                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <FaShieldAlt size={30} />
                        <div>
                            <h3 className="font-semibold">
                                Compliance Tracking
                            </h3>
                            <p className="text-sm text-green-100">
                                Monitor hospital standards in real-time
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <FaFileMedical size={30} />
                        <div>
                            <h3 className="font-semibold">
                                Document Analysis
                            </h3>
                            <p className="text-sm text-green-100">
                                AI-driven accreditation review
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <FaChartLine size={30} />
                        <div>
                            <h3 className="font-semibold">
                                Smart Insights
                            </h3>
                            <p className="text-sm text-green-100">
                                Generate compliance reports instantly
                            </p>
                        </div>
                    </div>

                </div>

                <div className="text-sm text-green-100">
                    © 2026 Hospital Accreditation AI Platform
                </div>

            </div>

            {/* RIGHT SECTION */}

            <div className="flex-1 flex justify-center items-center p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white shadow-2xl rounded-3xl p-10">

                        <h2 className="text-3xl font-bold text-slate-800">
                            Create Account
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Join AccredAI Platform
                        </p>

                        <div className="mt-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setError("");

                                }}
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="mt-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError("");

                                }}
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError("");

                                }}
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"

                            />
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
                        </div>

                        <div className="mt-4">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setError("");

                                }}
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-4">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleSignup}
                            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:scale-105 transition duration-300"
                        >
                            Send OTP
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );


}

export default Signup;
