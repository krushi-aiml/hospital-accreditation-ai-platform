import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
    FiHome,
    FiFileText,
    FiBarChart2,
    FiSettings,
    FiLogOut,
    FiUpload,
    FiClipboard
} from "react-icons/fi";

export default function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("isLoggedIn");

        navigate("/login");
    };

    return (
        <div
            className="
                w-64
                bg-white
                shadow-xl
                p-6
                hidden
                md:flex
                flex-col
                justify-between
            "
        >
            <div>

                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-blue-600">
                        🏥 AccredAI
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                        Hospital Accreditation Platform
                    </p>
                </div>

                <nav className="space-y-3">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition w-full
        ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                        }
                    >
                        <FiHome />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/upload"
                        className={({ isActive }) =>
                            `
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition w-full
        ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                        }
                    >
                        <FiUpload />
                        Upload
                    </NavLink>

                    <NavLink
                        to="/documents"
                        className={({ isActive }) =>
                            `
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition w-full
        ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                        }
                    >
                        <FiFileText />
                        Document Summaries
                    </NavLink>

                    <NavLink
                        to="/analysis"
                        className={({ isActive }) =>
                            `
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition w-full
        ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                        }
                    >
                        <FiBarChart2 />
                        Analysis
                    </NavLink>

                    <NavLink
                        to="/audit-history"
                        className={({ isActive }) =>
                            `
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition w-full
        ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                        }
                    >
                        <FiClipboard />
                        Audit History
                    </NavLink>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition w-full
        ${isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
        `
                        }
                    >
                        <FiFileText />
                        Reports
                    </NavLink>



                </nav>
            </div>

            {/* Logout */}

            <button
                onClick={handleLogout}
                className="
                    flex
                    items-center
                    gap-3
                    text-red-500
                    cursor-pointer
                    hover:bg-red-50
                    p-3
                    rounded-xl
                    transition
                    w-full
                "
            >
                <FiLogOut />
                Logout
            </button>

        </div>
    );
}