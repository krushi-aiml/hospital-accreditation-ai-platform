import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUploadCloud, FiFileText } from "react-icons/fi";
import Sidebar from "./components/Sidebar";

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpload = async () => {

        setLoading(true);

        try {

            const formData = new FormData();
            formData.append("file", selectedFile);

            await axios.post(
                "http://127.0.0.1:8000/upload",
                formData
            );

            setMessage("File uploaded successfully!");

        } catch (error) {

            console.error(error);
            alert("Upload failed");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Upload Hospital Documents
                </h1>

                <p className="text-gray-500 mt-2">
                    Upload NABH standards, fire safety reports, SOPs, policies, and compliance documents.
                </p>

                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

                    <label
                        className="
        border-2
        border-dashed
        border-blue-300
        rounded-2xl
        p-12
        text-center
        hover:bg-blue-50
        transition
        cursor-pointer
        block
    "
                    >
                        <FiUploadCloud className="mx-auto text-6xl text-blue-500" />

                        <h2 className="mt-4 text-xl font-semibold">
                            Drag & Drop Files Here
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Supported formats: PDF, DOCX
                        </p>

                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </label>

                    {selectedFile && (
                        <div className="mt-6 bg-gray-50 p-4 rounded-xl flex items-center gap-4">

                            <FiFileText className="text-blue-500 text-3xl" />

                            <div>
                                <p className="font-medium">
                                    {selectedFile.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Ready for upload
                                </p>
                            </div>

                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        disabled:bg-gray-400
    "
                    >
                        {loading ? "Uploading..." : "Upload File"}
                    </button>
                    {message && (
                        <>
                            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                                {message}
                            </div>

                            <button
                                onClick={() => navigate("/analysis")}
                                className="
                mt-4
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-xl
                transition
            "
                            >
                                Analyze Document
                            </button>
                        </>
                    )}

                </div>



            </div>

        </div>
    );
}