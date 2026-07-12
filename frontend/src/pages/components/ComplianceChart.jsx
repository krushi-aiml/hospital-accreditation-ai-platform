import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const data = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 75 },
    { month: "Apr", score: 80 },
    { month: "May", score: 85 },
    { month: "Jun", score: 87 },
];

export default function ComplianceChart() {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Compliance Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}