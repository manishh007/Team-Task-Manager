import { useEffect, useState } from "react";
import { getTasks, updateTaskStatus } from "../services/api";

export default function UserDashboard() {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchTasks = () => {
        getTasks(user._id, user.role).then(setTasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleUpdate = async (taskId) => {
        await updateTaskStatus(taskId, user._id, "completed");
        fetchTasks(); // 🔥 refresh UI
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">My Tasks</h1>

            {tasks.map(task => (
                <div key={task._id} className="border p-3 my-2">
                    <h2>{task.title}</h2>
                    <p>Status: {task.status}</p>

                    {task.status !== "completed" && (
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