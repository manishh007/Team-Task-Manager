import { useEffect, useState } from "react";
import { getTasks } from "../services/api";


export default function AdminDashboard() {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getTasks("", "admin").then(data => {
            console.log("ADMIN TASKS:", data); // 👈 ADD THIS
            setTasks(data);
        });
    }, []);


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">All Tasks</h1>

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