import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Register/Login';
import Register from '../pages/Register/Register';

// IMPORTAÇÃO DOS MÓDULOS DE ROTAS
import AlunoRoutes from './Aluno/AlunoRoutes'; 
import DetailGameRoutes from './Aluno/DetailRoutes/DetailRoutes'; 

// 🌟 GARANTA QUE ESTA LINHA APONTA EXATAMENTE PARA A SUA PASTA NO DISCO:
import CreatePartysRoutes from './Aluno/CreatePartysRoutes/CreatePartyRoutes'; 

function AppRoutes() {
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        {/* Fragmentos de Módulos Injetados Nativamente */}
        {...AlunoRoutes({ user })}
        {...DetailGameRoutes()}
        {...CreatePartysRoutes()}

        {/* Fallback de Segurança */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;