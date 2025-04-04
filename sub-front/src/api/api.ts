import axios from 'axios';
import { Client, Subscription } from '../types/types';

const BASE_URL = 'http://156.253.220.36:5001';

// Создаём экземпляр Axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Функция обновления токена в localStorage
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// 📌 API-запросы
export const fetchClients = async (): Promise<Client[]> => {
  const response = await api.get('/clients');
  return response.data;
};

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const response = await api.get('/subscriptions');
  return response.data;
};

export const addClient = async (client: Omit<Client, 'id'>): Promise<Client> => {
  try {
    console.log("Отправка клиента на сервер:", client);
    const response = await api.post('/clients', client);
    console.log("Ответ сервера:", response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении клиента:", error);
    throw error;
  }
};


export const addSubscription = async (subscription: Omit<Subscription, 'id'>): Promise<Subscription> => {
  const response = await api.post('/subscriptions', subscription);
  return response.data;
};

export const deleteClient = async (clientId: number) => {
  await api.delete(`/clients/${clientId}`);
};

export const deleteSubscription = async (subscriptionId: number) => {
  await api.delete(`/subscriptions/${subscriptionId}`);
};

export default api;
