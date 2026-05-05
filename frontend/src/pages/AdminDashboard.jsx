import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createProject, getProjects } from "../services/api";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectTitle, setProjectTitle] = useState("");
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(setUsers);
        getProjects().then(setProjects);
    }, []);

    const handleCreateProject = async () => {
        if (!projectTitle || selectedUsers.length === 0) {
            alert("Fill all fields");
            return;
        }

        const res = await createProject({
            title: projectTitle,
            users: selectedUsers,
        });

        navigate(`/assign/${res._id}`);
    };

    const handleUserSelect = (e) => {
        const value = e.target.value;
        setSelectedUsers(prev =>
            prev.includes(value) ? prev : [...prev, value]
        );
    };

    return (
        <div className="min-h-screen bg-orange-50 flex justify-center">

            <div className="w-full max-w-5xl p-6">

                {/* HEADER */}
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    Admin Dashboard
                </h1>

                {/* CREATE PROJECT CARD */}
                <div className="bg-white border border-orange-200 p-5 rounded-lg shadow-sm mb-8">

                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Create Project
                    </h2>

                    <input
                        placeholder="Project Title"
                        className="border border-orange-300 p-2 mb-2 w-full focus:outline-none focus:border-orange-500"
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />

                    <select
                        className="border border-orange-300 p-2 mb-2 w-full cursor-pointer focus:outline-none focus:border-orange-500"
                        onChange={handleUserSelect}
                    >
                        <option>Select User</option>
                        {users.map(u => (
                            <option key={u._id} value={u._id}>
                                {u.name}
                            </option>
                        ))}
                    </select>

                    <div className="text-sm text-gray-600 mb-3">
                        Selected:
                        {selectedUsers.length === 0 && " None"}
                        {selectedUsers.map(id => {
                            const u = users.find(x => x._id === id);
                            return (
                                <span key={id} className="ml-2 text-gray-800 font-medium">
                                    {u?.name}
                                </span>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleCreateProject}
                        className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 cursor-pointer"
                    >
                        Create Project
                    </button>
                </div>

                {/* PROJECT LIST */}
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    All Projects
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    {projects.map(p => (
                        <div
                            key={p._id}
                            onClick={() => navigate(`/project/${p._id}`)}
                            className="bg-white border border-orange-200 p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
                        >
                            <h3 className="text-gray-800 font-semibold">
                                {p.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Click to view details
                            </p>
                        </div>
                    ))}

                </div>

                {projects.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No projects created yet
                    </p>
                )}
            </div>
        </div>
    );
}