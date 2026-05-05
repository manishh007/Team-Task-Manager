# 🚀 Team Task Manager (Full-Stack)

A full-stack web application where **admins create projects, assign tasks to users, and track progress**, while users can update their assigned tasks.

---

## 🌐 Live Demo

* Frontend: https://your-frontend-url.vercel.app
* Backend: https://team-task-manager-production-6e3d.up.railway.app

---

## 📌 Features

### 🔐 Authentication

* Signup & Login (Admin / User roles)
* Password hashing using bcrypt
* Role-based access (Admin / User)

---

### 👨‍💼 Admin Features

* Create projects
* Select users for projects
* Assign tasks to users
* View all projects
* View tasks inside each project

---

### 👤 User Features

* View assigned projects
* Open project → see tasks
* Update own task status (Pending → Completed)
* Cannot modify others' tasks

---

### 📊 Project-Based Flow

* Dashboard shows **projects (not tasks)**
* Clicking a project opens **task details**
* Clean separation of responsibilities

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

```bash
team-task-manager/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── components/
│   └── index.html
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
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
* GET `/api/projects/:id`

### Tasks

* POST `/api/tasks/create`
* GET `/api/tasks`
* PUT `/api/tasks/:id`

---

## 🧠 Key Concepts

* Role-based access control
* Project-task relationship modeling
* MongoDB population (`ref`)
* REST API design
* State management with React hooks
* Full-stack integration

---

## 🎨 UI Highlights

* Centered layout
* Warm color theme
* Responsive grid design
* Clean card-based UI
* Hover interactions

---

## 🎥 Demo Video

(Add your 2–5 min demo video link here)

---

## 📌 Future Improvements

* Dropdown multi-select UI for users
* Real-time updates (Socket.io)
* Notifications system
* Better form validations
* Search & filters

---

## 👨‍💻 Author

**Mani**

---

## live vercel link 

* https://team-task-manager-peach-alpha.vercel.app/

