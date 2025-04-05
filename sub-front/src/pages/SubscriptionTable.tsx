import React, { useState, useEffect } from 'react';

import { fetchClients, fetchSubscriptions, deleteClient, deleteSubscription, setAuthToken } from '../api/api';
import { ClientWithSubscription } from '../types/types';
import './SubscriptionTable.css'; // Импортируем CSS файл

const SubscriptionTable: React.FC = () => {
  const [clients, setClients] = useState<ClientWithSubscription[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('userEmail'));


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      loadClients();
    } else {
      
    }
  }, []);

  // Загружаем клиентов и подписки
  const loadClients = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('Токен отсутствует, загрузка клиентов невозможна.');
        return;
      }

      setAuthToken(token);

      const clientsData = await fetchClients();
      const subscriptionsData = await fetchSubscriptions();

      // Объединяем клиентов и их подписки
      setClients(clientsData.map(client => ({
        ...client,
        subscription: subscriptionsData.find(sub => sub.clientId === client.id) || null,
      })));
    } catch (error) {
      console.error('Ошибка при загрузке клиентов:', error);
    }
  };

  // Удаление клиента и его подписки
  const handleDeleteClient = async (clientId: number) => {
    try {
      const client = clients.find((c) => c.id === clientId);

      // Если у клиента есть подписка, сначала удаляем её
      if (client?.subscription) {
        await deleteSubscription(client.subscription.id);
      }

      await deleteClient(clientId);
      loadClients();
    } catch (error) {
      console.error('Ошибка при удалении клиента:', error);
    }
  };

  // Функция форматирования даты в формат ДД-ММ-ГГГГ
  const formatDate = (dateString?: string) => {
    return dateString ? dateString.slice(0, 10).split('-').reverse().join('-') : '—';
  };



  return (
    <div className="container">
      {/* Блок пользователя и кнопка "Выйти" */}

      <h1 className="title">Управление клиентами и абонементами</h1>


      {/* Таблица клиентов */}
      <div className="table-container">
        <table className="client-table">
          <thead>
            <tr className="table-header">
              {['ID', 'Имя', 'Фамилия', 'Отчество', 'Email', 'Телефон', 'Статус', 'Начало', 'Окончание', 'Действия'].map((header) => (
                <th key={header} className="table-header-cell">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="table-row">
                <td className="table-cell">{client.id}</td>
                <td className="table-cell">{client.firstName}</td>
                <td className="table-cell">{client.lastName}</td>
                <td className="table-cell">{client.patronymic}</td>
                <td className="table-cell">{client.email}</td>
                <td className="table-cell">{client.phone}</td>
                <td className="table-cell text-center">{client.subscription?.status || 'Нет данных'}</td>
                <td className="table-cell text-center">{formatDate(client.subscription?.startDate)}</td>
                <td className="table-cell text-center">{formatDate(client.subscription?.endDate)}</td>
                <td className="table-cell text-center">
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className="delete-btn"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;
