import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

    const [stats, setStats] = useState({
        total_uploads: 0,
        total_analyses: 0,
        average_score: 0,
        total_summaries: 0,
        recent_audits: [],
        latest_document: null
    });

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/dashboard-stats")
            .then((res) => {
                setStats(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    let stars = "★☆☆☆☆";
    let level = "Level 1";
    let status = "High Risk";

    const score = Number(stats.average_score);

    if (score === 100) {
        stars = "★★★★★";
        level = "Level 5";
        status = "Fully Compliant";
    }
    else if (score >= 80) {
        stars = "★★★★☆";
        level = "Level 4";
        status = "Mostly Compliant";
    }
    else if (score >= 60) {
        stars = "★★★☆☆";
        level = "Level 3";
        status = "Moderately Compliant";
    }
    else if (score >= 40) {
        stars = "★★☆☆☆";
        level = "Level 2";
        status = "Needs Improvement";
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-6 space-y-6">

                {/* Header */}

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Welcome, Admin 👋
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Monitor accreditation readiness and compliance performance.
                    </p>

                </div>

                {/* KPI Cards */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <StatCard
                        title="Uploads"
                        value={stats.total_uploads}
                        color="blue"
                    />

                    <StatCard
                        title="Analyses"
                        value={stats.total_analyses}
                        color="green"
                    />

                    <StatCard
                        title="Average Score"
                        value={`${Number(stats.average_score).toFixed(0)}%`}
                        color="purple"
                    />

                    <StatCard
                        title="Summaries"
                        value={stats.total_summaries}
                        color="red"
                    />

                </div>

                {/* Compliance Readiness */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Overall Compliance Score
                    </h2>

                    <div className="text-5xl font-bold text-blue-600">
                        {score.toFixed(2)}%
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4 mt-5">

                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{
                                width: `${Number(stats.average_score).toFixed(2)}%`
                            }}
                        ></div>

                    </div>

                    <hr className="my-6" />

                    <h2 className="text-xl font-semibold">
                        Audit Readiness
                    </h2>

                    <div className="text-4xl text-yellow-500 mt-4">
                        {stars}
                    </div>

                    <div className="mt-3 text-xl font-semibold">
                        {level}
                    </div>

                    <div className="text-gray-600">
                        {status}
                    </div>

                </div>

                {/* Recent Audits + Latest Uploaded Document */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Audits */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            Recent Audits
                        </h2>

                        {
                            stats.recent_audits.length > 0 ? (

                                <div className="space-y-3">

                                    {
                                        stats.recent_audits.map(
                                            (audit, index) => (

                                                <div
                                                    key={index}
                                                    className="border-b pb-3"
                                                >

                                                    <div className="font-medium text-slate-800">
                                                        {audit.file_name}
                                                    </div>

                                                    <div className="text-yellow-500 text-xl">
                                                        {
                                                            Number(audit.score) === 100
                                                                ? "★★★★★"
                                                                : Number(audit.score) >= 80
                                                                    ? "★★★★☆"
                                                                    : Number(audit.score) >= 60
                                                                        ? "★★★☆☆"
                                                                        : Number(audit.score) >= 40
                                                                            ? "★★☆☆☆"
                                                                            : "★☆☆☆☆"
                                                        }
                                                    </div>

                                                    <div className="text-green-600 font-semibold">
                                                        {Number(audit.score).toFixed(0)}%
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        {audit.date}
                                                    </div>

                                                </div>

                                            )
                                        )
                                    }

                                </div>

                            ) : (

                                <p className="text-gray-500">
                                    No audit history available.
                                </p>

                            )
                        }

                    </div>

                    {/* Latest Uploaded Document */}

                    <div className="bg-white rounded-2xl shadow-lg p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            Latest Uploaded Document
                        </h2>

                        {
                            stats.latest_document ? (

                                <>

                                    <div className="font-medium text-blue-700 text-lg">
                                        📄 {stats.latest_document.file_name}
                                    </div>

                                    <div className="text-sm text-gray-500 mt-3">
                                        Uploaded:
                                    </div>

                                    <div className="text-sm">
                                        {stats.latest_document.created_at}
                                    </div>

                                </>

                            ) : (

                                <p className="text-gray-500">
                                    No document uploaded yet.
                                </p>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}