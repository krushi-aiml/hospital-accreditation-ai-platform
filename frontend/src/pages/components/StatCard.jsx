import {
    FaFileAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaChartBar
} from "react-icons/fa";

export default function StatCard({ title, value, color }) {

    const colors = {
        blue: "text-blue-600",
        green: "text-green-600",
        red: "text-red-600",
        purple: "text-purple-600",
    };

    const icons = {
        Documents: <FaFileAlt className="text-blue-500 text-3xl" />,
        "Compliance Score": <FaCheckCircle className="text-green-500 text-3xl" />,
        "Gaps Found": <FaExclamationTriangle className="text-red-500 text-3xl" />,
        Reports: <FaChartBar className="text-purple-500 text-3xl" />,
    };

    return (
        <div
            className="
                bg-white
                p-5
                rounded-2xl
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
            "
        >
            <div className="flex justify-between items-center">

                <div>
                    <p className="text-gray-500 text-sm">
                        {title}
                    </p>

                    <h2 className={`text-3xl font-bold mt-2 ${colors[color]}`}>
                        {value}
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                        Updated today
                    </p>
                </div>

                <div>
                    {icons[title]}
                </div>

            </div>
        </div>
    );
}