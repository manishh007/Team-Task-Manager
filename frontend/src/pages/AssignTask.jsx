import { useParams } from "react-router-dom";
import { useState } from "react";
import { createTask } from "../services/api";

export default function AssignTask() {
    const { projectId } = useParams();
    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");

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
            <h1>Assign Task</h1>

            <input
                placeholder="Task title"
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                placeholder="User ID"
                onChange={(e) => setUserId(e.target.value)}
            />

            <button onClick={handleAssign}>
                Assign
            </button>
        </div>
    );
}