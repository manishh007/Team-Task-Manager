import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, getUsers, createProject } from "../services/api";


export default function AdminDashboard() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectTitle, setProjectTitle] = useState("");
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getTasks("", "admin").then(setTasks);
        getUsers().then(setUsers);
    }, []);

    const handleCreateProject = async () => {
        const res = await createProject({
            title: projectTitle,
            users: selectedUsers,
        });

        navigate(`/assign/${res._id}`); // 👈 redirect
    };

    const handleUserSelect = (e) => {
        const value = e.target.value;
        setSelectedUsers(prev =>
            prev.includes(value) ? prev : [...prev, value]
        );
    };

    useEffect(() => {
        getTasks("", "admin").then(data => {
            console.log("ADMIN TASKS:", data); // 👈 ADD THIS
            setTasks(data);
        });
    }, []);


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">All Tasks</h1>
            <div className="border p-4 mb-4 rounded">
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
                    Selected Users:
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

            {tasks.map(task => (
                <div key={task._id} className="border p-3 my-2">
                    <h2>{task.title}</h2>
                    <p>Status: {task.status}</p>
                    <p>Assigned to: {task.assignedTo?.name}</p>
                </div>
            ))}
        </div>
    );
}