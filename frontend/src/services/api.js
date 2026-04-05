// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Use deployed backend URL if available, otherwise default to local proxy /api
  baseURL: process.env.REACT_APP_BACKEND_URL || '/api',
  timeout: 100000, // Increased to 100 seconds for slow free-tier cloud cold starts
  headers: { 'Content-Type': 'application/json' },
});

// ── Chatbot ──────────────────────────────────────────────
// POST /api/chat/message  →  Spring Boot  →  Claude AI
// Returns plain string reply
export const sendChatMessage = async (message, userId = 'guest') => {
  const chatbotUrl = process.env.REACT_APP_CHATBOT_URL || 'http://localhost:5000/api/chat';
  const response = await axios.post(chatbotUrl, { message, userId }, {
    headers: { 'Content-Type': 'application/json' }
  });
  const data = response.data;
  if (typeof data === 'string') return data;
  if (data.reply !== undefined) return data.reply;
  return String(data);
};

// ── Guidance ─────────────────────────────────────────────
export const analyzeProfile = async (profileData) => {
  const response = await api.post('/guidance/analyze', profileData);
  return response.data;
};

export const getSupportedSports = async () => {
  const response = await api.get('/guidance/sports');
  return response.data;
};

// ── Auth ─────────────────────────────────────────────────
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export default api;
