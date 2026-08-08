import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "todo", dueDate: "" });

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${process.env.BACKEND_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    await axios.post(`${process.env.BACKEND_URL}/api/tasks`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${process.env.BACKEND_URL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2>Dashboard</h2>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</button>
      </div>

      <h3 style={{ marginBottom: "0.5rem" }}>Add Task</h3>
      <div className="task-form">
          <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />

          <input type="date" onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <select onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
      </div>
      <div className="form-button">
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      <h3 style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>My Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <div>
            <strong>{task.title}</strong><br />
            <small>{task.status} | Due: {task.dueDate?.slice(0, 10)}</small><br />
            <small>{task.description}</small>
          </div>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
