import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";

export default function Documents() {

    const [summaries, setSummaries] = useState([]);

    useEffect(() => {

        loadSummaries();

    }, []);

    const loadSummaries = () => {

        axios
            .get("http://127.0.0.1:8000/document-summaries")
            .then((res) => {
                setSummaries(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

    };

    const clearSummaries = async () => {

        const confirmDelete = window.confirm(
            "Clear all document summaries?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                "http://127.0.0.1:8000/clear-summaries"
            );

            setSummaries([]);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Document Summaries
                        </h1>

                        <p className="text-gray-500 mt-2">
                            AI generated summaries of uploaded hospital policies.
                        </p>

                    </div>

                    <button
                        onClick={clearSummaries}
                        className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-5
                            py-2
                            rounded-xl
                        "
                    >
                        Clear Summaries
                    </button>

                </div>

                {summaries.length === 0 ? (

                    <div className="bg-white p-10 rounded-2xl shadow-lg text-center">

                        <h2 className="text-xl font-semibold">
                            No summaries available
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Upload a hospital policy document to generate AI summaries.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {summaries.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    bg-white
                                    rounded-2xl
                                    shadow-lg
                                    p-6
                                "
                            >

                                <h2 className="text-xl font-bold text-blue-700">

                                    {item.file_name}

                                </h2>

                                <p className="text-sm text-gray-500 mt-1">

                                    Generated:
                                    {" "}
                                    {item.created_at}

                                </p>

                                <div className="mt-4">

                                    <h3 className="font-semibold mb-2">

                                        AI Summary

                                    </h3>

                                    <pre
                                        className="
                                            whitespace-pre-wrap
                                            text-gray-700
                                            font-sans
                                        "
                                    >
                                        {item.summary}
                                    </pre>

                                </div>

                                <div className="mt-5">

                                    <a
                                        href={`http://127.0.0.1:8000/download-summary/${item.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            px-5
                                            py-2
                                            rounded-xl
                                        "
                                    >
                                        Download Summary PDF
                                    </a>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}