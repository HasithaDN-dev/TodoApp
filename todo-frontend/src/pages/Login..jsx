import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { setToken } from "../auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/Login", { email, password });
      setToken(data.token);
      if (data.fullName) localStorage.setItem("fullName", data.fullName);
      navigate("/todos");
    } catch (e) {
      setErr("Inavalid credentials");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <div className="mb-3 text-red-600">{err}</div>}
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 mb-3 w-full rounded-md border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          className="mt-1 mb-4 w-full rounded-md border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign in
          </button>
          <Link to="/register">
            <button
              type="button"
              className="rounded-md border px-4 py-2 hover:bg-gray-50"
            >
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
