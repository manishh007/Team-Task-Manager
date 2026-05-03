import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTask, getProject } from "../services/api";

export default function AssignTask() {
    const { projectId } = useParams();

    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");
    const [projectUsers, setProjectUsers] = useState([]);

    useEffect(() => {
        getProject(projectId).then(data => {
            setProjectUsers(data.users);
        });
    }, []);

    const handleAssign = async () => {
        const admin = JSON.parse(localStorage.getItem("user"));

        await createTask({
            title,
            projectId,
            assignedTo: userId,
            adminId: admin._id,
        });

        alert("Task assigned");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Assign Task</h1>

            {/* Task input */}
            <input
                className="border p-2 m-2"
                placeholder="Task title"
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* User dropdown */}
            <select
                className="border p-2 m-2"
                onChange={(e) => setUserId(e.target.value)}
            >
                <option>Select User</option>
                {projectUsers.map(u => (
                    <option key={u._id} value={u._id}>
                        {u.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleAssign}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Assign
            </button>
        </div>
    );
}