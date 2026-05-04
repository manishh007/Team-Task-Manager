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
        <div className="min-h-screen bg-orange-300 flex justify-center">

            <div className="w-full max-w-5xl p-6">

                <h1 className="text-2xl font-semibold text-orange-600 mb-6 text-center">
                    My Projects
                </h1>

                {/* PROJECT GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    {projects.map(project => (
                        <div
                            key={project._id}
                            onClick={() => navigate(`/project/${project._id}`)}
                            className="bg-orange-200 border border-orange-200 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">
                                {project.title}
                            </h2>

                            <p className="text-sm text-gray-700 mt-2">
                                Click to view tasks
                            </p>
                        </div>
                    ))}

                </div>

                {projects.length === 0 && (
                    <p className="text-center text-black mt-6">
                        No projects assigned
                    </p>
                )}
            </div>
        </div>
    );
}