import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Detail from '../pages/Detail'; // Importe a página de detalhes

// IMPORTAÇÃO DOS NOVOS MÓDULOS DE ROTAS
import AlunoRoutes from './AlunoRoutes';
import AdminRoutes from './AdminRoutes';

function AppRoutes() {
  // Simulando o estado do usuário (no futuro, virá do seu contexto de autenticação/Spring Boot)
  // Altere o role para 'ADMIN' para testar as rotas de administrador
  const [user, setUser] = useState({ name: "Jogador", role: "ALUNO" });

  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== ROTAS PÚBLICAS ==================== */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        
        {/* Rota de detalhes mantida individualmente ou mapeada se necessário */}
        <Route path="/detail/:id" element={<Detail user={user} />} />

        {/* ==================== ROTAS DO ALUNO ==================== 
            Desestruturando o array retornado por AlunoRoutes com o operador ...
        */}
        {...AlunoRoutes({ user })}

        {/* ==================== ROTAS DO ADMIN ==================== 
            Renderização condicional: só desestrutura e injeta na árvore de rotas 
            se o usuário logado tiver a role correspondente.
        */}
        {user?.role === 'ADMIN' && [...AdminRoutes({ user })]}

        {/* ==================== FALLBACK (SEGURANÇA) ====================
            Se o usuário tentar acessar qualquer rota inexistente, ele é jogado 
            de volta para a tela inicial de login com segurança.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;