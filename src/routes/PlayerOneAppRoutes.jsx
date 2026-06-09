import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Register/Login';
import Register from '../pages/Register/Register';
import Perfil from '../pages/Perfil/Perfil';

// IMPORTAÇÃO DOS MÓDULOS DE ROTAS
import AlunoRoutes from './Aluno/AlunoRoutes'; 
import DetailGameRoutes from './Aluno/DetailRoutes/DetailRoutes'; 
import CreatePartysRoutes from './Aluno/CreatePartysRoutes/CreatePartyRoutes';
import PartiesRoutes from './Aluno/PartysRoutes/PartysRoutes'; 
import MyPartysRoutes from './Aluno/MyPartys/MyPartysRoutes';
import PartyDetailsRoutes from './Aluno/PartysDetailRoutes/PartyDetailsRoutes';

function AppRoutes() {
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO", email: "aluno@unifor.br" });

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/perfil" element={<Perfil user={user} setUser={setUser} />} />
        
        {/* Fragmentos de Módulos Injetados Nativamente */}
        {...AlunoRoutes({ user })}
        {...DetailGameRoutes()}
        {...CreatePartysRoutes()}
        {...PartiesRoutes()}
        {...MyPartysRoutes()}
        {...PartyDetailsRoutes()}
        
        {/* Fallback de Segurança */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;