# 🚀 Team Task Manager (Full-Stack)

A full-stack web application where admins can create projects, assign tasks to users, and track progress in real-time.

---

## 🌐 Live Demo

* Frontend: https://your-frontend-url.vercel.app
* Backend: https://your-backend-url.up.railway.app

---

## 📌 Features

### 🔐 Authentication

* Signup & Login (Admin / User roles)
* Password hashing using bcrypt
* Role-based access control

### 👨‍💼 Admin Features

* Create projects
* Assign users to projects
* Create and assign tasks
* View all tasks and their statuses
* Dashboard with task statistics

### 👤 User Features

* View assigned tasks
* Update task status (pending → completed)
* Track progress

### 📊 Dashboard

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Deployment

* Backend: Railway
* Frontend: Vercel

---

## 📁 Folder Structure

```
team-task-manager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── index.html
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Projects

* POST `/api/projects/create`
* GET `/api/projects`
* GET `/api/projects/user/:userId`

### Tasks

* POST `/api/tasks/create`
* GET `/api/tasks`
* PUT `/api/tasks/:id`

### Dashboard

* GET `/api/dashboard`

---

## 🧠 Key Concepts

* Role-based access control (Admin vs User)
* MongoDB relationships using ObjectId
* REST API design
* State management with React hooks
* Full-stack integration

---

## 🎥 Demo Video

(Attach your 2–5 min demo video link here)

---

## 📌 Future Improvements

* Dropdown to select users instead of manual ID input
* Real-time updates using Socket.io
* Better UI/UX with animations
* Pagination and filtering

---

## 👨‍💻 Author

Mani

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
