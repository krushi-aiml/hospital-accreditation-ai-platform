import Sidebar from "./components/Sidebar";

export default function Settings() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Settings
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage hospital and account settings.
                </p>

                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Hospital Name
                        </label>

                        <input
                            type="text"
                            defaultValue="City Care Hospital"
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Admin Email
                        </label>

                        <input
                            type="email"
                            defaultValue="admin@hospital.com"
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Change Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full border rounded-xl p-3"
                        />
                    </div>

                    <button
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                        "
                    >
                        Save Settings
                    </button>

                </div>

            </div>

        </div>
    );
}