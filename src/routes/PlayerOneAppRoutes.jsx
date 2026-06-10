import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Register/Login';
import Register from '../pages/Register/Register';

// IMPORTAÇÃO DOS MÓDULOS DE ROTAS
import AlunoRoutes from './Aluno/AlunoRoutes'; 
import DetailGameRoutes from './Aluno/DetailRoutes/DetailRoutes'; 
import CreatePartysRoutes from './Aluno/CreatePartysRoutes/CreatePartyRoutes';
import PartiesRoutes from './Aluno/PartysRoutes/PartysRoutes'; 
import MyPartysRoutes from './Aluno/MyPartys/MyPartysRoutes';
import PartyDetailsRoutes from './Aluno/PartysDetailRoutes/PartyDetailsRoutes';

// 🌟 CORREÇÃO: Fazemos o AppRoutes receber o searchQuery vindo do App.jsx
function AppRoutes({ searchQuery }) {
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      
      {/* 🌟 CORREÇÃO: Incluímos o searchQuery dentro do objeto enviado para o AlunoRoutes */}
      {...AlunoRoutes({ user, setUser, searchQuery })}
      
      {...DetailGameRoutes()}
      {...CreatePartysRoutes()}
      {...PartiesRoutes()}
      {...MyPartysRoutes()}
      {...PartyDetailsRoutes()}
      
      {/* Fallback de Segurança */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;