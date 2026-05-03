const BASE_URL = "http://localhost:5000/api";

export const loginUser = (data) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());

export const getTasks = (userId, role) => {
    let url = `http://localhost:5000/api/tasks?role=${role}`;

    if (role !== "admin") {
        url += `&userId=${userId}`;
    }

    return fetch(url).then(res => res.json());
};

export const updateTaskStatus = (taskId, userId, status) =>
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
    }).then(res => res.json());

export const createTask = (data) =>
    fetch("http://localhost:5000/api/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());