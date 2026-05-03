import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://team-task-manager-production-6e3d.up.railway.app/api";

export default function Auth() {
    const navigate = useNavigate(); // ✅ FIXED

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
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-2xl font-bold mb-4">
                {isLogin ? "Login" : "Signup"}
            </h1>

            {!isLogin && (
                <input
                    className="border p-2 m-2 w-64"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            )}

            <input
                className="border p-2 m-2 w-64"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-2 m-2 w-64"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
                <select
                    className="border p-2 m-2 w-64"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            )}

            <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 mt-3"
            >
                {isLogin ? "Login" : "Signup"}
            </button>

            <p
                className="mt-4 text-blue-500 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin
                    ? "Don't have an account? Signup"
                    : "Already have an account? Login"}
            </p>
        </div>
    );
}