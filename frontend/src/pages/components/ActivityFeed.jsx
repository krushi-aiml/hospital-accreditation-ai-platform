export default function ActivityFeed() {
    return (
        <div
            className="
    bg-white
    p-6
    rounded-2xl
    shadow-md
    hover:shadow-xl
    transition-all
"
        >
            <h2 className="text-lg font-semibold mb-4">
                Recent Activity
            </h2>

            <ul className="space-y-2 text-sm text-gray-600">
                <li>📄 New document uploaded - ICU Standards</li>
                <li>📊 Compliance check completed</li>
                <li>🤖 AI report generated</li>
                <li>⚠ Gap detected in safety audit</li>
            </ul>
        </div>
    );
}