import { useEffect, useState } from "react";
import { getTasks } from "../services/api";

export default function UserDashboard() {
    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getTasks(user._id, user.role).then(setTasks);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">My Tasks</h1>

            {tasks.map(task => (
                <div key={task._id} className="border p-3 my-2">
                    <h2>{task.title}</h2>
                    <p>Status: {task.status}</p>
                </div>
            ))}
        </div>
    );
}