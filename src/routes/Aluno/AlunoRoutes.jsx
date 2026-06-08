import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../../pages/Home'; // Sua página atual do catálogo
//import Perfil from '../pages/Perfil'; // Página de perfil (ícone do cabeçalho)
//import Reservas from '../pages/Reservas'; // Página de reservas (ícone de notificações)

const AlunoRoutes = ({ user } = {}) => [
  <Route key="home" path="/home" element={<Home user={user} />} />,
  //<Route key="perfil" path="/perfil" element={<Perfil user={user} />} />,
  //<Route key="reservas" path="/reservas" element={<Reservas user={user} />} />
];

export default AlunoRoutes;