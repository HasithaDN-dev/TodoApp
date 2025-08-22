import { Link, useLocation } from "react-router-dom";
import {getToken, logout} from "../auth/auth";

export default function Navbar() {
    const token = getToken();
    return (
        <nav className="bg-white border-b shadow-md">
            <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="font-bold text-blue-600 text-lg">TodoApp</span>
                    <span className="text-gray-500 text-sm">React . spring Boot</span>
                </div>
                <div className="flex space-x-2">
                    {!token && <Link to="/login" className="px-3 py-1 border border-blue-600 rounded text-blue-600 hover:bg-blue-50">Login</Link>}
                    {!token && <Link to="/register" className="px-3 py-1 bg-blue-600 rounded text-white hover:bg-blue-700">Register</Link>}
                    {token && <button onClick={logout} className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600">Logout</button>}  
                </div>
            </div>
        </nav>
    );
}