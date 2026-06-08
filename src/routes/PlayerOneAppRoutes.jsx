import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Register/Login';
import Register from '../pages/Register/Register';

// IMPORTAÇÃO DOS MÓDULOS DE ROTAS (Ajustado conforme sua nova estrutura)
import AlunoRoutes from './Aluno/AlunoRoutes'; 

function AppRoutes() {
  // Estado do usuário simulado como ALUNO para liberar o catálogo
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== ROTAS PÚBLICAS ==================== */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        {/* ==================== ROTAS DO ALUNO ==================== 
            Descomentado e ativado! O operador '...' espalha as rotas de aluno 
            (incluindo a Home) aqui dentro de forma nativa.
        */}
        {...AlunoRoutes({ user })}

        {/* ==================== FALLBACK (SEGURANÇA) ==================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;