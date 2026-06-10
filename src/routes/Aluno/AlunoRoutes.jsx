import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../../pages/Home'; 
import Profile from '../../pages/Perfil/Perfil'; 

// 🌟 CORREÇÃO: Adicionamos o searchQuery nos parâmetros recebidos pela função
const AlunoRoutes = ({ user, setUser, searchQuery } = {}) => [ 
  
  // 🌟 CORREÇÃO: Injetamos o searchQuery aqui na tag do <Home />
  <Route key="home" path="/home" element={<Home searchQuery={searchQuery} />} />,
  
  <Route key="perfil" path="/perfil" element={<Profile user={user} setUser={setUser} />} />
];

export default AlunoRoutes;