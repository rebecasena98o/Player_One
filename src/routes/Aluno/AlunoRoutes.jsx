import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../../pages/Home'; 
import Profile from '../../pages/Perfil/Perfil'; // 🌟 1. Importa o componente real de perfil

const AlunoRoutes = ({ user, setUser } = {}) => [ // 🌟 2. Recebe também o setUser aqui
  <Route key="home" path="/home" element={<Home />} />,
  
  // 🌟 3. Renderiza o componente Profile real passando o user e o setUser
  <Route key="perfil" path="/perfil" element={<Profile user={user} setUser={setUser} />} />
];

export default AlunoRoutes;