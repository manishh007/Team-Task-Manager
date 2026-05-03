const BASE_URL = "https://team-task-manager-production-6e3d.up.railway.app/";

export const loginUser = (data) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());

export const getTasks = (userId, role) => {
    let url = `https://team-task-manager-production-6e3d.up.railway.app/tasks?role=${role}`;

    if (role !== "admin") {
        url += `&userId=${userId}`;
    }

    return fetch(url).then(res => res.json());
};

export const updateTaskStatus = (taskId, userId, status) =>
    fetch(`https://team-task-manager-production-6e3d.up.railway.app/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
    }).then(res => res.json());

export const createTask = (data) =>
    fetch("https://team-task-manager-production-6e3d.up.railway.app/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());