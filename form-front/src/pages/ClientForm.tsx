import React, { useState } from 'react';
import { addClient, addSubscription, setAuthToken } from '../api/api';
import { Client, Subscription } from '../types/types';
import './ClientForm.css'; // Import the CSS file

interface ClientFormProps {
  onClientAdded: () => void; // Function to update the table
}

const ClientForm: React.FC<ClientFormProps> = ({ onClientAdded }) => {
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    firstName: '',
    lastName: '',
    patronymic: '',
    email: '',
    phone: '',
  });

  const [newSubscription, setNewSubscription] = useState<Omit<Subscription, 'id'>>({
    clientId: 0,
    status: 'Активен',
    startDate: '',
    endDate: '',
  });

  const isValidClient = () => {
    return Object.values(newClient).every((val) => val !== '') &&
      Object.values(newSubscription).every((val) => val !== '');
  };

  const handleAddClientWithSubscription = async () => {
    if (!isValidClient()) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Ошибка: отсутствует токен аутентификации.');
        return;
      }

      setAuthToken(token); // Set the token

      console.log("Добавляем клиента:", newClient);
      const addedClient = await addClient(newClient);
      console.log("Клиент успешно добавлен:", addedClient);

      const subscriptionData = { ...newSubscription, clientId: addedClient.id };
      console.log("Добавляем подписку:", subscriptionData);

      await addSubscription(subscriptionData);
      console.log("Подписка успешно добавлена!");

      // После успешного добавления, очищаем поля формы
      setNewClient({
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        phone: '',
      });
      setNewSubscription({
        clientId: 0,
        status: 'Активен',
        startDate: '',
        endDate: '',
      });

      // Показываем сообщение об успешном добавлении данных
      alert('Клиент успешно добавлен.');

      onClientAdded(); // Update the table
    } catch (error) {
      console.error("Ошибка при добавлении клиента:", error);
    }
  };

  return (
    <div className="client-form">
      <h2 className="form-title">Добавить нового клиента</h2>

      <div className="form-grid">
        {/* Client Fields */}
        <div>
          <label className="form-label">Имя</label>
          <input
            type="text"
            placeholder="Введите имя"
            value={newClient.firstName}
            onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Фамилия</label>
          <input
            type="text"
            placeholder="Введите фамилию"
            value={newClient.lastName}
            onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Отчество</label>
          <input
            type="text"
            placeholder="Введите отчество"
            value={newClient.patronymic}
            onChange={(e) => setNewClient({ ...newClient, patronymic: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Введите email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Телефон</label>
          <input
            type="tel"
            placeholder="88005553535"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            className="form-input"
          />
        </div>

        {/* Subscription Fields */}
        <div>
          <label className="form-label">Статус абонемента</label>
          <select
            value={newSubscription.status}
            onChange={(e) => setNewSubscription({ ...newSubscription, status: e.target.value })}
            className="form-input"
          >
            <option value="Активен">Активен</option>
            <option value="Не активен">Не активен</option>
            <option value="Заморожен">Заморожен</option>
          </select>
        </div>

        <div>
          <label className="form-label">Дата начала</label>
          <input
            type="date"
            value={newSubscription.startDate}
            onChange={(e) => setNewSubscription({ ...newSubscription, startDate: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Дата окончания</label>
          <input
            type="date"
            value={newSubscription.endDate}
            onChange={(e) => setNewSubscription({ ...newSubscription, endDate: e.target.value })}
            className="form-input"
          />
        </div>
      </div>

      <button
        onClick={handleAddClientWithSubscription}
        className="form-button"
      >
        Добавить клиента с абонементом
      </button>
    </div>
  );
};

export default ClientForm;
