import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

export default function Analysis() {

    const [result, setResult] = useState(null);
    const [question, setQuestion] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get("http://127.0.0.1:8000/analyze")
            .then((res) => {

                console.log("Analyze Response:", res.data);

                setResult(res.data);

            })
            .catch((err) => {

                console.error(err);

            });

    }, []);

    const askChatbot = async () => {

        if (!question.trim()) return;

        setLoading(true);

        try {

            const res = await axios.post(
                "http://127.0.0.1:8000/chat",
                {
                    question
                }
            );

            setChatResponse(res.data.answer);

        }
        catch (error) {

            console.error(error);

            setChatResponse(
                "Failed to get AI response."
            );

        }

        setLoading(false);

    };

    const chartData = [
        {
            name: "Passed",
            value: result?.matched?.length || 0
        },
        {
            name: "Missing",
            value: result?.missing?.length || 0
        }
    ];

    const COLORS = [
        "#22c55e",
        "#ef4444"
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold text-slate-800 mb-6">
                    AI Compliance Analysis
                </h1>

                {!result ? (

                    <div className="text-lg text-gray-600">
                        Loading analysis...
                    </div>

                ) : (

                    <div className="space-y-6">

                        <div className="bg-white p-6 rounded-2xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-3">
                                Compliance Score
                            </h2>

                            <div className="text-5xl font-bold text-green-600">
                                {result?.compliance_score ?? 0}%
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">

                                <div
                                    className="bg-green-500 h-4 rounded-full"
                                    style={{
                                        width: `${result?.compliance_score ?? 0}%`
                                    }}
                                />

                            </div>

                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-4">
                                Compliance Distribution
                            </h2>

                            <div className="flex items-center justify-between">

                                <PieChart
                                    width={380}
                                    height={280}
                                >

                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        dataKey="value"
                                        label
                                    >

                                        {chartData.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index]}
                                            />

                                        ))}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                                <div className="bg-slate-50 rounded-xl shadow p-6 w-64 text-center">

                                    <h3 className="text-xl font-semibold text-slate-700">
                                        Audit Readiness
                                    </h3>

                                    <div className="text-5xl mt-5 text-amber-400">

                                        {result?.audit_rank || "N/A"}

                                    </div>

                                    <div className="mt-5 text-lg font-semibold text-blue-600">

                                        {result?.readiness_level || "N/A"}

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-4 text-green-700">
                                Matched Standards
                            </h2>

                            <ul className="space-y-2">

                                {(result?.matched || []).map((item, index) => (

                                    <li key={index}>
                                        ✅ {item}
                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-4 text-red-700">
                                Missing Standards
                            </h2>

                            <ul className="space-y-2">

                                {(result?.missing || []).map((item, index) => (

                                    <li key={index}>
                                        ❌ {item}
                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-4 text-blue-700">
                                Recommendations
                            </h2>

                            <ul className="space-y-2">

                                {(result?.recommendations || []).map((item, index) => (

                                    <li key={index}>
                                        • {item}
                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">

                            <h2 className="text-xl font-semibold mb-4 text-purple-700">
                                🤖 AI Compliance Assistant
                            </h2>

                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ask anything about this audit..."
                                className="w-full border p-3 rounded-lg mb-4"
                            />

                            <button
                                onClick={askChatbot}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                            >
                                Ask AI
                            </button>

                            {loading && (

                                <p className="mt-4">
                                    Thinking...
                                </p>

                            )}

                            {chatResponse && (

                                <div className="mt-4 bg-gray-100 p-4 rounded-lg">

                                    <strong>AI:</strong>

                                    <p className="mt-2">
                                        {chatResponse}
                                    </p>

                                </div>

                            )}

                        </div>

                        <div className="flex justify-center">

                            <button
                                onClick={() => navigate("/reports")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                            >
                                Generate Report
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}