import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.jsx";

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b shadow-md">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link to="/" className="font-bold text-blue-600 text-lg hover:text-blue-700">
                        TodoApp
                    </Link>
                    <span className="text-gray-500 text-sm">React + Spring Boot</span>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-600">
                                Welcome, {user?.fullName || user?.email}
                            </span>
                            <button 
                                onClick={handleLogout} 
                                className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="px-3 py-1 border border-blue-600 rounded text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="px-3 py-1 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}