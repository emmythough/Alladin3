// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('trader'); // Default role
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store role in localStorage
      window.location.href = '/';
    } catch (error) {
      setError(error.response.data.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="trader">Trader</option>
        <option value="portfolio_manager">Portfolio Manager</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
