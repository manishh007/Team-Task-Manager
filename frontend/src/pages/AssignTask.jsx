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
        if (!title || !userId) {
            alert("Please fill all fields");
            return;
        }

        const admin = JSON.parse(localStorage.getItem("user"));

        await createTask({
            title,
            projectId,
            assignedTo: userId,
            adminId: admin._id,
        });

        setTitle("");
        setUserId("");
        alert("Task assigned");
    };

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center">

            <div className="w-full max-w-md bg-white border border-orange-200 shadow-sm p-6">

                {/* TITLE */}
                <h1 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    Assign Task
                </h1>

                {/* SELECT */}
                <select
                    value={userId}
                    className="w-full border border-orange-300 p-2 mb-4 cursor-pointer focus:outline-none focus:border-orange-500"
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option value="">Select User</option>
                    {projectUsers.map(u => (
                        <option key={u._id} value={u._id}>
                            {u.name}
                        </option>
                    ))}
                </select>
                {/* INPUT */}
                <input
                    value={title}
                    className="w-full border border-orange-300 p-2 mb-3 focus:outline-none focus:border-orange-500"
                    placeholder="Task title"
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* BUTTON */}
                <button
                    onClick={handleAssign}
                    className="w-full bg-orange-500 text-white py-2 hover:bg-orange-600 cursor-pointer"
                >
                    Assign Task
                </button>
            </div>
        </div>
    );
}