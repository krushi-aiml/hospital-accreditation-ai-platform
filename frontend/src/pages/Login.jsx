import { FaHospital, FaShieldAlt, FaFileMedical, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async () => {

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/login",
                {
                    email,
                    password
                }
            );

            if (
                response.data.message ===
                "Login successful"
            ) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "userEmail",
                    email
                );
                localStorage.setItem("isLoggedIn", "true");

                navigate("/dashboard");

            } else {

                setError(
                    response.data.message
                );
            }

        } catch (error) {

            setError(
                "Login failed. Please try again."
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
                            <h3 className="font-semibold">Compliance Tracking</h3>
                            <p className="text-sm text-green-100">
                                Monitor hospital standards in real-time
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <FaFileMedical size={30} />
                        <div>
                            <h3 className="font-semibold">Document Analysis</h3>
                            <p className="text-sm text-green-100">
                                AI-driven accreditation review
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                        <FaChartLine size={30} />
                        <div>
                            <h3 className="font-semibold">Smart Insights</h3>
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
                            Welcome 👋
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Sign in to continue to your dashboard
                        </p>

                        <div className="mt-8">

                            <label className="block mb-2 font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />

                        </div>

                        <div className="mt-5">

                            <label className="block mb-2 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <p
                                className="text-sm text-emerald-600 mt-2 cursor-pointer hover:underline"
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot Password?
                            </p>

                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-4">
                                {error}
                            </p>
                        )}
                        <button
                            onClick={handleLogin}
                            className="
    w-full
    mt-8
    bg-gradient-to-r
    from-emerald-600
    to-green-500
    text-white
    py-4
    rounded-xl
    font-semibold
    hover:scale-105
    transition
    duration-300"
                        >
                            Sign In
                        </button>
                        <p className="text-center text-gray-600 mt-5">
                            Don't have an account?{" "}
                            <span
                                className="text-emerald-600 font-semibold cursor-pointer hover:underline"
                                onClick={() => navigate("/signup")}
                            >
                                Create Account
                            </span>
                        </p>
                        <p className="text-center text-gray-500 mt-6 text-sm">
                            Secure AI-Powered Compliance Management
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;