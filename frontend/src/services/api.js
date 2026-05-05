const BASE_URL = "https://team-task-manager-vjj7.onrender.com/api";

const handleResponse = async (res) => {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }
    return res.json();
};

export const loginUser = (data) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(handleResponse);

export const getUsers = () =>
    fetch(`${BASE_URL}/users`).then(handleResponse);

export const getProjects = () =>
    fetch(`${BASE_URL}/projects`).then(handleResponse);

export const getUserProjects = (userId) =>
    fetch(`${BASE_URL}/projects/user/${userId}`).then(handleResponse);

export const getProject = (id) =>
    fetch(`${BASE_URL}/projects/${id}`).then(handleResponse);

export const createProject = (data) =>
    fetch(`${BASE_URL}/projects/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(handleResponse);

export const getTasks = ({ userId, role, projectId }) => {
    let url = `${BASE_URL}/tasks?role=${role}`;

    if (userId) url += `&userId=${userId}`;
    if (projectId) url += `&projectId=${projectId}`;

    return fetch(url).then(handleResponse);
};

export const updateTaskStatus = (taskId, userId, status) =>
    fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
    }).then(handleResponse);

export const createTask = (data) =>
    fetch(`${BASE_URL}/tasks/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(handleResponse);