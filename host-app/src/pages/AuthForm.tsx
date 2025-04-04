import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css';

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const userData = isRegister
      ? { username, firstName, lastName, email, password }
      : { email, password };

    try {
      let response;
      if (isRegister) {
        response = await register(userData);
        alert('Регистрация успешна! Теперь войдите в систему.');
        setIsRegister(false);
      } else {
        response = await login(email, password);
        const token = response.token;
        if (token) {
          console.log(token);
          authLogin(token);
          navigate('/home');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при отправке данных');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div>
                <label htmlFor="username">Логин</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="firstName">Имя</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Фамилия</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        <div className="text-center">
          <p>
            {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
            <button
              type="button"
              className="toggle-button"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
