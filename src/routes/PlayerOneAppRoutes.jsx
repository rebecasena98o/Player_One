import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Register/Login';
import Register from '../pages/Register/Register';


import AlunoRoutes from './Aluno/AlunoRoutes'; 
import DetailGameRoutes from './Aluno/DetailRoutes/DetailRoutes'; 
import CreatePartysRoutes from './Aluno/CreatePartysRoutes/CreatePartyRoutes'; 


import AdminRoutes from './Admin/AdminRoutes'; 

function AppRoutes() {
  
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        {...AlunoRoutes({ user })}
        {...DetailGameRoutes()}
        {...CreatePartysRoutes()}
        {...AdminRoutes()}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;