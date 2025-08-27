import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import API from "../api/axios";
import { setToken } from "../auth/auth";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const {data} = await API.post("/auth/register", {email, password, fullName });
            setToken(data.token);
            if(data.fullName) localStorage.setItem("fullName", data.fullName);
            navigate("/todos");
        } catch (e) {
            setErr("Registration failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <form
            onSubmit={submit}
            className="bg-white rounded-xl shadow p-6"
            >
                <h2 className="text-2xl font-semibold mb-4">Create account</h2>
                {err && <div className="mb-3 text-red-600">{err}</div>}

                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input>



//  type here















                </input>
            </form>
        </div>
    )
}