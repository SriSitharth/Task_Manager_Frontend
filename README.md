# Task Management System - Frontend

A responsive task management web application built with React and Vite.  
The frontend provides user authentication and task CRUD functionality through a REST API.

## 🚀 Live Demo

Frontend: [Add Vercel URL here]

Backend API: [Add Render URL here]

---

## 📋 Project Overview

The Task Management System allows users to:

- Create an account
- Login securely
- View their tasks
- Create new tasks
- Update existing tasks
- Delete tasks
- Track task status
- Logout from the application

The frontend communicates with the backend using REST APIs.

---

## 🛠️ Tech Stack

- **React** - UI development
- **Vite** - Frontend build tool
- **React Router** - Client-side routing
- **Axios** - HTTP requests
- **CSS** - Responsive styling
- **JavaScript** - Application logic

---

## 📁 Project Structure

```text
client/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Tasks.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js