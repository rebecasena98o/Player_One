import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag e fila para evitar múltiplos refreshes simultâneos se várias requisições falharem ao mesmo tempo
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor de Requisição: Injeta o Token JWT em todas as rotas protegidas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Resposta: Trata expiração do JWT (Erro 401) e tenta o Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Evita loop infinito se a própria rota de login ou refresh falhar
    if (originalRequest.url.includes('/api/v1/auth/login') || originalRequest.url.includes('/api/v1/auth/refresh')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Rota de Refresh mapeada no seu OpenAPI
        const response = await api.post('/api/v1/auth/refresh');
        const { access_token } = response.data;

        localStorage.setItem('access_token', access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        
        processQueue(null, access_token);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Limpa os tokens e desloga o usuário caso o refresh também falhe
        localStorage.removeItem('access_token');
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;