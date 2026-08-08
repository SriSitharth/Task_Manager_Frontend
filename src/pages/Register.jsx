import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name.trim()) return alert('Please enter your name');
    if (!email.trim()) return alert('Please enter your email');
    if (!password) return alert('Please enter a password');
    if (password !== confirmPassword) return alert('Passwords do not match');

    try {
      const res = await API.post('/auth/register', { name, email, password, confirmPassword });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box animate-fade-in">
        <h1 className="app-title">Task Manager - Register</h1>
      {/* <h2 register-text>Register</h2> */}
      <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button className="btn" onClick={handleRegister}>Register</button>
    <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
   </div>
    </div>
  );
}
