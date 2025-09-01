import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-4">
                    The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="text-blue-600 hover:underline font-medium">
                    Go back to Home
                </Link>
            </div>
        </div>
    );
}