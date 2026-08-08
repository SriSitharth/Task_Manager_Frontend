# Task Manager (Frontend) — Vite + React

**Project Overview**:
- **Stack**: React (frontend) with Vite for development and build.
- **Purpose**: Simple task manager UI for registering, logging in, and managing tasks (create/list/delete).

**Setup & Installation**:
- **Requirements**: Node.js (>=16) and npm.
- Install dependencies:

```bash
npm install
```

- Run development server:

```bash
npm run dev
# or
npm start
```

- Create a production build:

```bash
npm run build
```

- Preview a production build locally:

```bash
npm run preview
```

**Key project files**:
- **App entry**: [index.html](index.html)
- **React entry**: [src/index.js](src/index.js)
- **Vite config**: [vite.config.js](vite.config.js)
- **API client**: [src/services/api.js](src/services/api.js)

**Environment Variables**:
- Vite exposes env vars via `import.meta.env`. All frontend-facing env variables must be prefixed with `VITE_`.
- Example `.env`:

```
VITE_BACKEND_URL=http://localhost:5000
```

- In code use: `import.meta.env.VITE_BACKEND_URL` (already applied to API and pages).

**API Endpoints (documented from frontend usage)**:
- **Auth**:
  - POST /api/auth/register — register a new user
    - Body: `{ "name": "...", "email": "...", "password": "..." }`
    - Response: `{ token: "<jwt>" }` (frontend stores in `localStorage`)
  - POST /api/auth/login — login
    - Body: `{ "email": "...", "password": "..." }`
    - Response: `{ token: "<jwt>" }`
- **Tasks** (requires `Authorization: Bearer <token>` header):
  - GET /api/tasks — list tasks for the authenticated user
  - POST /api/tasks — create a task
    - Body example: `{ "title": "...", "description": "...", "status": "todo", "dueDate": "YYYY-MM-DD" }`
  - DELETE /api/tasks/:id — delete a task by id

**Migration notes (CRA → Vite)**:
- Replaced `react-scripts` with Vite. Entry now loads `/src/index.js` from root [index.html](index.html).
- Environment variables moved to Vite style `VITE_*` and accessed with `import.meta.env`.
- If you have other `process.env.REACT_APP_*` usages, change them to `import.meta.env.VITE_*` or keep them as build-time replacements.

**Next steps / Tips**:
- Run `npm install` to add Vite and the plugin.
- If you use CI or hosting, update build commands to `npm run build`.
- Review any third-party libs that depended on CRA behavior and update accordingly.
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