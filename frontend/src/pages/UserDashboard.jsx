import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProjects } from "../services/api";

export default function UserDashboard() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getUserProjects(user._id).then(setProjects);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">My Projects</h1>

            {projects.map(p => (
                <div
                    key={p._id}
                    onClick={() => navigate(`/project/${p._id}`)}
                    className="bg-white shadow p-3 my-2 cursor-pointer"
                >
                    {p.title}
                </div>
            ))}
        </div>
    );
}