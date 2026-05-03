import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await loginUser({ email, password });

        localStorage.setItem("user", JSON.stringify(res));

        // redirect based on role
        if (res.role === "admin") {
            window.location.href = "/admin";
        } else {
            window.location.href = "/user";
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <input
                className="border p-2 m-2"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border p-2 m-2"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Login
            </button>
        </div>
    );
}