import { createBrowserRouter, Navigate } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';

// Importações do Aluno/Comum
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Parties from './pages/Parties';
import PartyDetails from './pages/PartyDetails';
import MyParties from './pages/MyParties';
import CreateParty from './pages/CreateParty';
import Profile from './pages/Profile';

// 1. IMPORTAR AS ROTAS DO ADMIN AQUI
import { adminRoutes } from './routes/AdminRoutes'; 

export const router = createBrowserRouter([
  // --- ROTAS PÚBLICAS DO USUÁRIO/ALUNO ---
  { path: '/login', Component: Login },
  { path: '/signup', Component: Signup },

  // --- ROTAS PROTEGIDAS DO USUÁRIO/ALUNO ---
  { path: '/', element: <ProtectedRoute><Home /></ProtectedRoute> },
  { path: '/home', element: <Navigate to="/" replace /> },
  { path: '/Home', element: <Navigate to="/" replace /> },
  { path: '/game/:id', element: <ProtectedRoute><GameDetails /></ProtectedRoute> },
  { path: '/parties', element: <ProtectedRoute><Parties /></ProtectedRoute> },
  { path: '/parties/:id', element: <ProtectedRoute><PartyDetails /></ProtectedRoute> },
  { path: '/parties/create', element: <ProtectedRoute><CreateParty /></ProtectedRoute> },
  { path: '/my-parties', element: <ProtectedRoute><MyParties /></ProtectedRoute> },
  { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },

  // --- 2. INJETAR TODAS AS ROTAS DO ADMIN DE UMA SÓ VEZ ---
  ...adminRoutes,
]);