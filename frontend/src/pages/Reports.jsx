import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    FiCheckCircle,
    FiAlertTriangle,
    FiDownload
} from "react-icons/fi";

export default function Report() {
    const [report, setReport] = useState(null);
    let stars = "★☆☆☆☆";
    let level = "Level 1";
    let status = "High Risk";

    if (report?.compliance_score === 100) {
        stars = "★★★★★";
        level = "Level 5";
        status = "Fully Compliant";
    }
    else if (report?.compliance_score >= 80) {
        stars = "★★★★☆";
        level = "Level 4";
        status = "Mostly Compliant";
    }
    else if (report?.compliance_score >= 60) {
        stars = "★★★☆☆";
        level = "Level 3";
        status = "Moderately Compliant";
    }
    else if (report?.compliance_score >= 40) {
        stars = "★★☆☆☆";
        level = "Level 2";
        status = "Needs Improvement";
    }

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/analyze")
            .then((res) => {
                setReport(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-8">

                {/* Header */}

                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Accreditation Report
                        </h1>

                        <p className="text-gray-500 mt-2">
                            AI-generated compliance assessment report
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            window.open(
                                "http://127.0.0.1:8000/download-report",
                                "_blank"
                            )
                        }
                        className="
        flex
        items-center
        gap-2
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        py-3
        rounded-xl
        transition
    "
                    >
                        <FiDownload />
                        Download Report
                    </button>

                </div>

                {/* Compliance Score */}

                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold">
                        Overall Compliance Score
                    </h2>

                    <div className="mt-4">

                        <div className="flex justify-between">
                            <span>Compliance</span>
                            <span className="font-bold text-green-600">
                                {report?.compliance_score}%
                            </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
                            <div
                                className="bg-green-500 h-4 rounded-full"
                                style={{
                                    width: `${report?.compliance_score || 0}%`
                                }}
                            ></div>
                        </div>

                    </div>

                </div>
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold text-blue-700">
                        Audit Readiness
                    </h2>

                    <div className="flex flex-col items-center mt-6">

                        <div className="text-5xl text-yellow-500">
                            {stars}
                        </div>

                        <p className="mt-4 text-2xl font-semibold">
                            {level}
                        </p>

                        <p className="text-gray-500 text-lg">
                            {status}
                        </p>

                    </div>

                </div>

                {/* Passed Standards */}


                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold text-green-600">
                        Passed Standards
                    </h2>

                    <div className="mt-4 space-y-3">

                        {report?.matched?.map((item, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <FiCheckCircle className="text-green-500" />
                                {item}
                            </div>

                        ))}

                    </div>

                </div>

                {/* Missing Standards */}

                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold text-red-600">
                        Missing Standards
                    </h2>

                    <div className="mt-4 space-y-3">

                        {report?.missing?.map((item, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <FiAlertTriangle className="text-red-500" />
                                {item}
                            </div>

                        ))}

                    </div>
                </div>

                {/* AI Recommendations */}

                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold">
                        🤖 AI Recommendations
                    </h2>

                    <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700">

                        {report?.recommendations?.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

            </div>

        </div>
    );
}