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
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

            {/* CREATE PROJECT */}
            <div className="border p-4 mb-6 rounded">
                <h2 className="font-bold mb-2">Create Project</h2>

                <input
                    placeholder="Project Title"
                    className="border p-2 m-1"
                    onChange={(e) => setProjectTitle(e.target.value)}
                />

                <select
                    className="border p-2 m-1"
                    onChange={handleUserSelect}
                >
                    <option>Select User</option>
                    {users.map(u => (
                        <option key={u._id} value={u._id}>
                            {u.name}
                        </option>
                    ))}
                </select>

                <div className="mt-2">
                    Selected:
                    {selectedUsers.map(id => {
                        const u = users.find(x => x._id === id);
                        return <span key={id} className="mx-2">{u?.name}</span>;
                    })}
                </div>

                <button
                    onClick={handleCreateProject}
                    className="bg-green-500 text-white px-3 py-1 mt-2"
                >
                    Create Project
                </button>
            </div>

            {/* PROJECT LIST */}
            <h2 className="font-bold mb-2">All Projects</h2>

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