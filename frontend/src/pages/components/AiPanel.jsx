export default function AiPanel() {
    return (
        <div
            className="
    bg-white
    rounded-2xl
    shadow-md
    p-4
    hover:shadow-xl
    transition-all
"
        >
            <h2 className="text-lg font-semibold mb-4">
                🤖 AI Insights
            </h2>

            <ul className="space-y-3 text-sm">
                <li>⚠ Missing fire safety documentation</li>
                <li>⚠ ICU compliance below threshold</li>
                <li>✅ Staff training records updated</li>
                <li>⚠ Biomedical waste report pending</li>
            </ul>
        </div>
    );
}