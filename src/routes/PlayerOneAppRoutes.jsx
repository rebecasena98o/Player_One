import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Register/Login';
import Register from '../pages/Register/Register';

// IMPORTAÇÃO DOS MÓDULOS DE ROTAS DO ALUNO
import AlunoRoutes from './Aluno/AlunoRoutes'; 
import DetailGameRoutes from './Aluno/DetailRoutes/DetailRoutes'; 
import CreatePartysRoutes from './Aluno/CreatePartysRoutes/CreatePartyRoutes';
import PartiesRoutes from './Aluno/PartysRoutes/PartysRoutes'; 
import MyPartysRoutes from './Aluno/MyPartys/MyPartysRoutes';
import PartyDetailsRoutes from './Aluno/PartysDetailRoutes/PartyDetailsRoutes';


import AdminRoutes from './Admin/AdminRoutes'; 


function AppRoutes({ searchQuery }) {
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      
      {...AlunoRoutes({ user, setUser, searchQuery })}
      
      {...DetailGameRoutes()}
      {...CreatePartysRoutes()}
      {...PartiesRoutes()}
      {...MyPartysRoutes()}
      {...PartyDetailsRoutes()}
      
      {...AdminRoutes()}
      
      {/* Fallback de Segurança */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;