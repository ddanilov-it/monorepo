import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-900"> {/* Тёмный фон для улучшения контраста */}
      <div className="container mx-auto px-4 lg:max-w-[1200px]">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-semibold text-white"> {/* Светлый текст для заголовка */}
            Панель управления
          </h1>
          {isAuthenticated && (
            <div className="flex items-center space-x-6"> {/* Увеличили расстояние между элементами */}
              <a 
                href="/addclient"
                className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
              >
                Добавление
              </a>
              <a 
                href="/view"
                className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
              >
                Просмотр
              </a>
              <button 
                onClick={handleLogout}
                className="text-white hover:text-gray-300 transition-colors text-xl font-semibold"
              >
                Выход
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
