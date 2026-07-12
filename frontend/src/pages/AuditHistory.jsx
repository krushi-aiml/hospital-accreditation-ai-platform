import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

export default function AuditHistory() {

    const [history, setHistory] = useState([]);

    const clearHistory = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to clear all audit history?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                "http://127.0.0.1:8000/clear-history"
            );

            setHistory([]);

            alert("Audit history cleared successfully");

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/audit-history")
            .then((res) => {
                setHistory(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    }, []);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold text-slate-800">
                        Audit History
                    </h1>

                    <button
                        onClick={clearHistory}
                        className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-xl
                        "
                    >
                        Clear History
                    </button>

                </div>

                {/* Trend Chart */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Compliance Trend
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart data={history}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="id" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="compliance_score"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                {/* Audit Table */}

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-3">
                                    File Name
                                </th>

                                <th className="text-left p-3">
                                    Date
                                </th>

                                <th className="text-left p-3">
                                    Score
                                </th>

                                <th className="text-left p-3">
                                    Matched
                                </th>

                                <th className="text-left p-3">
                                    Missing
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        {item.file_name}
                                    </td>

                                    <td className="p-3">
                                        {item.audit_date}
                                    </td>

                                    <td className="p-3 font-semibold text-green-600">
                                        {item.compliance_score}%
                                    </td>

                                    <td className="p-3">
                                        {item.matched_count}
                                    </td>

                                    <td className="p-3">
                                        {item.missing_count}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}