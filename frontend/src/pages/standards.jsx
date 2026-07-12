import { useEffect, useState } from "react";
import axios from "axios";

export default function Standards() {
    const [standards, setStandards] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/standards")
            .then((response) => {
                setStandards(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                Hospital Standards
            </h1>

            {standards.map((item, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-xl p-4 mb-4"
                >
                    <h2 className="font-bold text-blue-600">
                        {item.standard_id}
                    </h2>

                    <p>
                        <strong>Source:</strong> {item.source}
                    </p>

                    <p>
                        <strong>Category:</strong> {item.category}
                    </p>

                    <p>
                        <strong>Requirement:</strong> {item.requirement}
                    </p>

                    <p>
                        <strong>Severity:</strong> {item.severity}
                    </p>
                </div>
            ))}
        </div>
    );
}