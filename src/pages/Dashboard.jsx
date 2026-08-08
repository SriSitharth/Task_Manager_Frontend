import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "todo", dueDate: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", status: "todo", dueDate: "" });

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    // Normalize response to an array in case API returns an object
    const data = res.data;
    if (Array.isArray(data)) setTasks(data);
    else if (data && Array.isArray(data.tasks)) setTasks(data.tasks);
    else setTasks([]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
    await API.post('/tasks', form);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "", status: "todo", dueDate: "" });
  };

  const handleUpdate = async (id) => {
    await API.put(`/tasks/${id}`, editForm);
    cancelEdit();
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2>Dashboard</h2>
          <button className="btn btn-danger" onClick={() => { localStorage.clear(); window.location.reload(); }}>Logout</button>
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
          <button className="btn add-btn" onClick={handleAdd}>Add</button>
      </div>

      <h3 style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>My Tasks</h3>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          {editingId === task._id ? (
            <>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                <input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <input type="date" value={editForm.dueDate} onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })} />
                <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="task-edit-actions">
                 <button className="btn" onClick={() => handleUpdate(task._id)}>Save</button>
                 <button className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ flex: 1 }}>
                <strong>{task.title}</strong><br />
                <small>{task.status} | Due: {task.dueDate?.slice(0, 10)}</small><br />
                <small>{task.description}</small>
              </div>
              <div className="task-actions">
                 <button className="btn btn-outline" onClick={() => startEdit(task)}>Edit</button>
                 <button className="btn btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
