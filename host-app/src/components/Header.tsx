import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // window.location.href = '/';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">Панель управления</h1>
          {isAuthenticated && (
            <div className="header-links">
              <a href="/one" className="header-link">Добавление</a>
              <a href="/two" className="header-link">Просмотр</a>
              <button onClick={handleLogout} className="header-link button-link">Выход</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
