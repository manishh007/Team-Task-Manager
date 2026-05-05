import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://team-task-manager-vjj7.onrender.com/api";

export default function Auth() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const handleSubmit = async () => {
        const url = isLogin
            ? `${BASE_URL}/auth/login`
            : `${BASE_URL}/auth/signup`;

        const payload = isLogin
            ? { email, password }
            : { name, email, password, role };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg || "Something went wrong");
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));

            if (data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50">

            <div className="bg-linear-to-r from-cyan-100 to-blue-200 border rounded-2xl border-orange-200 p-6 w-80 shadow-md">

                <h1 className="text-xl font-semibold mb-4 text-center text-orange-600">
                    {isLogin ? "Login" : "Signup"}
                </h1>

                {!isLogin && (
                    <input
                        className="border border-orange-300 rounded p-2 mb-2 w-full focus:outline-none"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                )}

                <input
                    className="border border-orange-300 rounded p-2 mb-2 w-full focus:outline-none"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border border-orange-300 rounded p-2 mb-2 w-full focus:outline-none"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!isLogin && (
                    <select
                        className="border border-orange-300 rounded p-2 mb-2 w-full cursor-pointer focus:outline-none"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                )}

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-orange-500 text-white w-full rounded-2xl py-2 mt-2 cursor-pointer hover:bg-orange-600"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>

                <p
                    className="mt-4 text-sm text-center text-orange-600 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Signup"
                        : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
}