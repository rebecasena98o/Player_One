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

function AppRoutes() {
  // O estado do utilizador nasce aqui
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      
      {/* 🌟 CORREÇÃO AQUI: Passamos o user E TAMBÉM o setUser para dentro das rotas do Aluno */}
      {...AlunoRoutes({ user, setUser })}
      
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