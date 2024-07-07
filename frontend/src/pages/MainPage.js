// src/components/MainPage.js
import React from 'react';

const MainPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainPage;
