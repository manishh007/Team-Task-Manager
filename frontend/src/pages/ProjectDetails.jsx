import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "../services/api";

export default function ProjectDetails() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchTasks = () => {
        getTasks({
            role: user.role,
            userId: user._id,
            projectId,
        }).then(setTasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleUpdate = async (taskId) => {
        await updateTaskStatus(taskId, user._id, "completed");
        fetchTasks(); // refresh
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Project Tasks</h1>

            {tasks.length === 0 && <p>No tasks found</p>}

            {tasks.map(task => (
                <div
                    key={task._id}
                    className="border p-3 my-2 rounded shadow"
                >
                    <h2 className="font-semibold">{task.title}</h2>

                    <p>Assigned to: {task.assignedTo?.name}</p>
                    <p>Status: {task.status}</p>

                    {/* Only user can update their own task */}
                    {user.role === "user" &&
                        user._id === task.assignedTo?._id &&
                        task.status !== "completed" && (
                            <button
                                onClick={() => handleUpdate(task._id)}
                                className="bg-green-500 text-white px-3 py-1 mt-2"
                            >
                                Mark Complete
                            </button>
                        )}
                </div>
            ))}
        </div>
    );
}